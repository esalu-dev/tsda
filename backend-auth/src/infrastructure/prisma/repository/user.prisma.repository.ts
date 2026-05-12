import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { PrismaService } from '../context/prisma.service';
import { User } from 'generated/prisma-pg/client';
import { UserCreateInput } from 'generated/prisma-pg/models';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.writer.user.findUnique({ where: { email } });
  }

  async save(user: UserCreateInput): Promise<User> {
    return this.prisma.writer.user.create({ data: user });
  }

  async findByConflictKeys(
    email: string,
    username: string,
    numControl: string,
  ): Promise<User | null> {
    return this.prisma.writer.user.findFirst({
      where: {
        OR: [{ email }, { username }, { numControl }],
      },
    });
  }

  async findByNumControl(numControl: string): Promise<User | null> {
    return this.prisma.writer.user.findUnique({ where: { numControl } });
  }

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    return this.prisma.writer.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
  }

  // Pure read-only query → MySQL replica
  async findFirst5ByConflictKeys(query: string): Promise<
    {
      id: string;
      email: string;
      username: string;
      numControl: string;
      bannings: { reason: string; duration: Date | null } | null;
    }[]
  > {
    return await this.prisma.reader.user.findMany({
      where: {
        OR: [
          { email: { contains: query } },
          { username: { contains: query } },
          { numControl: { contains: query } },
        ],
      },
      take: 5,
      select: {
        id: true,
        email: true,
        username: true,
        numControl: true,
        bannings: { select: { reason: true, duration: true } },
      },
    });
  }

  async findAll(): Promise<
    {
      id: string;
      email: string;
      username: string;
      numControl: string;
      role: string;
    }[]
  > {
    return await this.prisma.reader.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        numControl: true,
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
