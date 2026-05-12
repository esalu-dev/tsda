import { Bannings } from 'generated/prisma-pg/client';
import { BanningsCreateInput } from 'generated/prisma-pg/models';

export interface IBanningsRepository {
  findByEmail(email: string): Promise<Bannings | null>;
  create(ban: BanningsCreateInput): Promise<Bannings>;
  delete(id: string): Promise<void>;
}

export const IBanningsRepository = Symbol('IBanningsRepository');
