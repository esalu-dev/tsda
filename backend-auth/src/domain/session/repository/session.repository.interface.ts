import { UserSession } from 'generated/prisma-pg/client';
import { UserSessionCreateInput } from 'generated/prisma-pg/models';

export interface ISessionRepository {
  findByRefreshToken(refreshToken: string): Promise<string | null>;
  create(session: UserSessionCreateInput): Promise<UserSession>;
  deleteByRefreshToken(refreshToken: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
}

export const ISessionRepository = Symbol('ISessionRepository');
