#!/bin/sh
set -e

echo "==========================================="
echo "  SymmetricDS - Profedex Replication Engine"
echo "==========================================="

POSTGRES_HOST="postgres"
POSTGRES_DB="profedex"
POSTGRES_USER="profedex"
POSTGRES_PASSWORD="profedex_secret"

MYSQL_HOST="mysql"
MYSQL_DB="profedex"
MYSQL_ROOT_PASSWORD="root_password"

PSQL_CMD="psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB"
MYSQL_CMD="mysql --skip-ssl -h $MYSQL_HOST -u root -p$MYSQL_ROOT_PASSWORD"

SYM_HOME="/opt/symmetric-ds"
CONFIG_SQL="$SYM_HOME/init/init-config.sql"

REPLICA_PROPS="$SYM_HOME/engines/mysql-replica.properties"
REPLICA_STAGED="$SYM_HOME/engines/mysql-replica.properties.staged"

# -------------------------------------------------------------------
# 1. Esperar PostgreSQL (master)
# -------------------------------------------------------------------
wait_for_postgres() {
  echo "[1/5] Esperando PostgreSQL (master)..."
  local retries=60
  while [ $retries -gt 0 ]; do
    if PGPASSWORD="$POSTGRES_PASSWORD" $PSQL_CMD -c "SELECT 1" > /dev/null 2>&1; then
      echo "  PostgreSQL listo."
      return 0
    fi
    retries=$((retries - 1))
    echo "  PostgreSQL no disponible... ($retries restantes)"
    sleep 3
  done
  echo "[error] PostgreSQL no respondio."
  exit 1
}

# -------------------------------------------------------------------
# 2. Esperar MySQL (replica)
# -------------------------------------------------------------------
wait_for_mysql() {
  echo "[2/5] Esperando MySQL (replica)..."
  local retries=60
  while [ $retries -gt 0 ]; do
    if nc -z $MYSQL_HOST 3306 > /dev/null 2>&1; then
      echo "  MySQL listo."
      return 0
    fi
    retries=$((retries - 1))
    echo "  MySQL no disponible... ($retries restantes)"
    sleep 3
  done
  echo "[error] MySQL no respondio."
  exit 1
}

# -------------------------------------------------------------------
# 3. Esperar infraestructura
# -------------------------------------------------------------------
wait_for_postgres
wait_for_mysql

# -------------------------------------------------------------------
# 4. Detectar si es primera ejecucion o ejecucion subsecuente
#    Miramos si ya existe la tabla sym_trigger en PostgreSQL (la crea
#    SymmetricDS en su bootstrap).
# -------------------------------------------------------------------
SYM_TABLES_EXIST=$(
  PGPASSWORD="$POSTGRES_PASSWORD" $PSQL_CMD -t -A -c "
    SELECT COUNT(*)
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'sym_trigger';
  " 2>/dev/null || echo "0"
)

IS_CONFIGURED=$(
  if [ "$SYM_TABLES_EXIST" = "1" ] 2>/dev/null; then
    PGPASSWORD="$POSTGRES_PASSWORD" $PSQL_CMD -t -A -c "
      SELECT COUNT(*)
      FROM sym_trigger
      WHERE trigger_id='trigger_user';
    " 2>/dev/null || echo "0"
  else
    echo "0"
  fi
)

# ===================================================================
# RUTA A: Ya configurado previamente → Arrancar con AMBOS motores
# ===================================================================
if [ "$IS_CONFIGURED" != "0" ] 2>/dev/null; then
  echo "[3/5] Configuracion existente detectada."
  echo "[4/5] Nada que configurar."

  # Asegurar que mysql-replica.properties esta en engines/
  if [ -f "$REPLICA_STAGED" ]; then
    mv "$REPLICA_STAGED" "$REPLICA_PROPS"
  fi

  echo "[5/5] Iniciando SymmetricDS con ambos motores..."
  echo "==========================================="
  echo "  Replicacion PostgreSQL -> MySQL activa"
  echo "==========================================="

  # exec reemplaza este proceso → Docker recibe señales correctamente
  exec $SYM_HOME/bin/sym --port 31415
fi

# ===================================================================
# RUTA B: Primera ejecucion → Setup completo
# ===================================================================
echo "[3/5] Primera ejecucion detectada. Configurando..."

# -------------------------------------------------------------------
# 3a. Mover replica fuera para que solo arranque postgres-master
# -------------------------------------------------------------------
if [ -f "$REPLICA_PROPS" ]; then
  mv "$REPLICA_PROPS" "$REPLICA_STAGED"
  echo "  mysql-replica.properties movido a staging."
fi

# -------------------------------------------------------------------
# 3b. Arrancar SymmetricDS TEMPORALMENTE solo con postgres-master
# -------------------------------------------------------------------
echo "  Iniciando SymmetricDS temporal (solo postgres-master)..."

$SYM_HOME/bin/sym --port 31415 &
SYM_PID=$!

# -------------------------------------------------------------------
# 3c. Esperar bootstrap completo (tablas sym_* en PostgreSQL)
# -------------------------------------------------------------------
echo "[4/5] Esperando bootstrap de SymmetricDS..."

retries=120
TABLE_COUNT=0
while [ $retries -gt 0 ]; do
  TABLE_COUNT=$(
    PGPASSWORD="$POSTGRES_PASSWORD" $PSQL_CMD -t -A -c "
      SELECT COUNT(*)
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('sym_trigger', 'sym_node', 'sym_node_security', 'sym_node_identity');
    " 2>/dev/null || echo "0"
  )

  if [ "$TABLE_COUNT" = "4" ] 2>/dev/null; then
    echo "  Bootstrap completo - 4/4 tablas sym_* encontradas."
    break
  fi

  retries=$((retries - 1))
  if [ $((retries % 10)) -eq 0 ]; then
    echo "  Esperando tablas sym_* ($TABLE_COUNT/4, $retries restantes)"
  fi
  sleep 5
done

if [ "$TABLE_COUNT" != "4" ] 2>/dev/null; then
  echo "[error] Bootstrap no completo despues de 10 minutos."
  exit 1
fi

# Esperar a que el motor se estabilice
sleep 15

# -------------------------------------------------------------------
# 3d. Aplicar configuracion SQL en PostgreSQL
# -------------------------------------------------------------------
echo "  Aplicando configuracion de replicacion..."
PGPASSWORD="$POSTGRES_PASSWORD" $PSQL_CMD -f $CONFIG_SQL
echo "  Configuracion SQL aplicada."

# Esperar procesamiento
sleep 10

# -------------------------------------------------------------------
# 3e. Sincronizar triggers
# -------------------------------------------------------------------
echo "  Sincronizando triggers..."
$SYM_HOME/bin/symadmin --engine postgres-master sync-triggers

# -------------------------------------------------------------------
# 3f. Abrir registro para el nodo replica
# -------------------------------------------------------------------
echo "  Abriendo registro para nodo replica-001..."
$SYM_HOME/bin/symadmin --engine postgres-master open-registration replica replica-001

# Verificar que el registro se abrio
retries=15
REG_READY="0"
while [ $retries -gt 0 ]; do
  REG_READY=$(
    PGPASSWORD="$POSTGRES_PASSWORD" $PSQL_CMD -t -A -c "
      SELECT COUNT(*)
      FROM sym_node_security
      WHERE node_id='replica-001'
        AND registration_enabled=true;
    " 2>/dev/null || echo "0"
  )
  if [ "$REG_READY" = "1" ] 2>/dev/null; then
    echo "  Registro abierto para replica-001 confirmado."
    break
  fi
  retries=$((retries - 1))
  sleep 2
done

if [ "$REG_READY" != "1" ] 2>/dev/null; then
  echo "  Reintentando open-registration..."
  $SYM_HOME/bin/symadmin --engine postgres-master open-registration replica replica-001
  sleep 5
fi

# -------------------------------------------------------------------
# 3g. DETENER SymmetricDS temporal
#     El hot-deploy de engines no es confiable, asi que matamos
#     el proceso y reiniciamos con AMBOS motores.
# -------------------------------------------------------------------
echo "  Deteniendo SymmetricDS temporal..."
kill $SYM_PID 2>/dev/null || true
wait $SYM_PID 2>/dev/null || true
echo "  SymmetricDS detenido."

# Dar tiempo para liberar puertos
sleep 5

# -------------------------------------------------------------------
# 3h. Restaurar mysql-replica.properties
# -------------------------------------------------------------------
if [ -f "$REPLICA_STAGED" ]; then
  mv "$REPLICA_STAGED" "$REPLICA_PROPS"
  echo "  mysql-replica.properties restaurado en engines/."
fi

# -------------------------------------------------------------------
# 5. REINICIAR SymmetricDS con AMBOS motores
#    Ahora postgres-master tiene la configuracion lista y el registro
#    abierto. mysql-replica arrancara, creara sus tablas sym_*
#    en MySQL, se registrara, y recibira la carga inicial.
# -------------------------------------------------------------------
echo "[5/5] Reiniciando SymmetricDS con AMBOS motores..."
echo "==========================================="
echo "  Replicacion PostgreSQL -> MySQL activa"
echo "==========================================="

# exec reemplaza este proceso → Docker recibe señales correctamente
exec $SYM_HOME/bin/sym --port 31415
