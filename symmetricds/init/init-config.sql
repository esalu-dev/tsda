-- =============================================================================
-- SymmetricDS: Configuración de replicación PostgreSQL → MySQL
-- Replicación unidireccional (one-way push)
--
-- Este SQL se ejecuta contra PostgreSQL (nodo maestro) la primera vez
-- que SymmetricDS arranca. Configura la topología de replicación.
--
-- Tablas replicadas (basado en prisma/pg/schema.prisma):
--   User, UserSession, Administrator, Bannings, PasswordResetToken
-- =============================================================================

-- 1. Definir grupos de nodos
INSERT INTO sym_node_group (node_group_id, description)
VALUES ('master', 'PostgreSQL Primary - Source of truth')
ON CONFLICT (node_group_id) DO NOTHING;

INSERT INTO sym_node_group (node_group_id, description)
VALUES ('replica', 'MySQL Read Replica')
ON CONFLICT (node_group_id) DO NOTHING;

-- 2. Definir enlace unidireccional: master PUSH → replica
INSERT INTO sym_node_group_link
  (source_node_group_id, target_node_group_id, data_event_action)
VALUES ('master', 'replica', 'P')
ON CONFLICT (source_node_group_id, target_node_group_id) DO NOTHING;

-- 3. Definir canal de sincronización
INSERT INTO sym_channel
  (channel_id, processing_order, max_batch_size, max_batch_to_send,
   contains_big_lob, enabled, description)
VALUES
  ('profedex_channel', 1, 5000, 10, 1, 1, 'Canal principal de replicación Profedex')
ON CONFLICT (channel_id) DO NOTHING;

-- 4. Router: envía TODOS los datos del master al replica (tipo default)
INSERT INTO sym_router
  (router_id, source_node_group_id, target_node_group_id, router_type,
   last_update_time, create_time)
VALUES
  ('master_to_replica', 'master', 'replica', 'default',
   current_timestamp, current_timestamp)
ON CONFLICT (router_id) DO NOTHING;

-- =============================================================================
-- 5. Triggers para capturar cambios en las tablas de la aplicación
--    NOTA: Prisma crea las tablas con nombres case-sensitive usando comillas
--    en PostgreSQL. El source_table_name debe coincidir exactamente.
--    Verificar con: SELECT tablename FROM pg_tables WHERE schemaname='public';
-- =============================================================================

-- 5a. Tabla User
INSERT INTO sym_trigger
  (trigger_id, source_table_name, channel_id,
   sync_on_insert, sync_on_update, sync_on_delete,
   sync_on_incoming_batch, use_stream_lobs,
   last_update_time, create_time)
VALUES
  ('trigger_user', 'User', 'profedex_channel',
   1, 1, 1, 0, 0,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id) DO NOTHING;

-- 5b. Tabla UserSession
INSERT INTO sym_trigger
  (trigger_id, source_table_name, channel_id,
   sync_on_insert, sync_on_update, sync_on_delete,
   sync_on_incoming_batch, use_stream_lobs,
   last_update_time, create_time)
VALUES
  ('trigger_usersession', 'UserSession', 'profedex_channel',
   1, 1, 1, 0, 0,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id) DO NOTHING;

-- 5c. Tabla Administrator
INSERT INTO sym_trigger
  (trigger_id, source_table_name, channel_id,
   sync_on_insert, sync_on_update, sync_on_delete,
   sync_on_incoming_batch, use_stream_lobs,
   last_update_time, create_time)
VALUES
  ('trigger_administrator', 'Administrator', 'profedex_channel',
   1, 1, 1, 0, 0,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id) DO NOTHING;

-- 5d. Tabla Bannings
INSERT INTO sym_trigger
  (trigger_id, source_table_name, channel_id,
   sync_on_insert, sync_on_update, sync_on_delete,
   sync_on_incoming_batch, use_stream_lobs,
   last_update_time, create_time)
VALUES
  ('trigger_bannings', 'Bannings', 'profedex_channel',
   1, 1, 1, 0, 0,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id) DO NOTHING;

-- 5e. Tabla PasswordResetToken
INSERT INTO sym_trigger
  (trigger_id, source_table_name, channel_id,
   sync_on_insert, sync_on_update, sync_on_delete,
   sync_on_incoming_batch, use_stream_lobs,
   last_update_time, create_time)
VALUES
  ('trigger_passwordresettoken', 'PasswordResetToken', 'profedex_channel',
   1, 1, 1, 0, 0,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id) DO NOTHING;

-- =============================================================================
-- 6. Enlazar cada trigger con el router
--    initial_load_order define el orden de carga inicial (respetar FK constraints)
--    User debe cargarse antes que sus dependientes (UserSession, Administrator, Bannings)
-- =============================================================================

INSERT INTO sym_trigger_router
  (trigger_id, router_id, initial_load_order, initial_load_select,
   last_update_time, create_time)
VALUES
  ('trigger_user', 'master_to_replica', 1, NULL,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id, router_id) DO NOTHING;

INSERT INTO sym_trigger_router
  (trigger_id, router_id, initial_load_order, initial_load_select,
   last_update_time, create_time)
VALUES
  ('trigger_administrator', 'master_to_replica', 2, NULL,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id, router_id) DO NOTHING;

INSERT INTO sym_trigger_router
  (trigger_id, router_id, initial_load_order, initial_load_select,
   last_update_time, create_time)
VALUES
  ('trigger_bannings', 'master_to_replica', 3, NULL,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id, router_id) DO NOTHING;

INSERT INTO sym_trigger_router
  (trigger_id, router_id, initial_load_order, initial_load_select,
   last_update_time, create_time)
VALUES
  ('trigger_usersession', 'master_to_replica', 4, NULL,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id, router_id) DO NOTHING;

INSERT INTO sym_trigger_router
  (trigger_id, router_id, initial_load_order, initial_load_select,
   last_update_time, create_time)
VALUES
  ('trigger_passwordresettoken', 'master_to_replica', 5, NULL,
   current_timestamp, current_timestamp)
ON CONFLICT (trigger_id, router_id) DO NOTHING;
