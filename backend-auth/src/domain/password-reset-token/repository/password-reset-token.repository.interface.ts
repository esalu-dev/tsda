import { PasswordResetToken } from 'generated/prisma-pg/client';

export interface IPasswordResetTokenRepository {
  create(token: string, email: string): Promise<PasswordResetToken>;
  findByToken(token: string): Promise<PasswordResetToken | null>;
  delete(token: string): Promise<void>;
}

export const IPasswordResetTokenRepository = Symbol(
  'IPasswordResetTokenRepository',
);
