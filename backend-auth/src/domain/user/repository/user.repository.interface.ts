import { User } from 'generated/prisma-pg/client';
import { UserCreateInput } from 'generated/prisma-pg/models';

export interface IUserRepository {
  // Finds
  findByEmail(email: string): Promise<User | null>;
  findByConflictKeys(
    email: string,
    username: string,
    numControl: string,
  ): Promise<User | null>;
  findByNumControl(numControl: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;

  findFirst5ByConflictKeys(query: string): Promise<
    {
      id: string;
      email: string;
      username: string;
      numControl: string;
      bannings: { reason: string; duration: Date | null } | null;
    }[]
  >;

  findAll(): Promise<
    {
      id: string;
      email: string;
      username: string;
      numControl: string;
      role: string;
    }[]
  >;

  // Inserts
  save(user: UserCreateInput): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
