/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Pool } from 'pg';

@Injectable()
export class CleanUserSessionsService {
  private readonly logger = new Logger(CleanUserSessionsService.name);
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'profedex',
      password: process.env.POSTGRES_PASSWORD || 'profedex_secret',
      database: process.env.POSTGRES_DB || 'profedex',
    });
  }

  @Cron('* * * * *')
  async cleanExpiredSessions() {
    this.logger.log('Iniciando limpieza de sesiones expiradas...');
    try {
      const result = await this.pool.query(
        'DELETE FROM "UserSession" WHERE "expiresAt" < NOW()',
      );
      this.logger.log(
        `Limpieza completada. Sesiones eliminadas: ${result.rowCount}`,
      );
    } catch (error) {
      this.logger.error('Error al limpiar sesiones', error);
    }
  }
}
