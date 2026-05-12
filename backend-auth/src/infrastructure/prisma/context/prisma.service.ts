import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaClientPg } from 'generated/prisma-pg/client';
import { PrismaClient as PrismaClientMySql } from 'generated/prisma-mysql/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly writer: PrismaClientPg;
  public readonly reader: PrismaClientMySql;

  constructor() {
    const pgAdapter = new PrismaPg({
      connectionString:
        process.env.DATABASE_URL_PG ??
        'postgresql://profedex:profedex_secret@localhost:5432/profedex',
    });
    this.writer = new PrismaClientPg({ adapter: pgAdapter });

    const mysqlAdapter = new PrismaMariaDb({
      host: 'mysql',
      port: 3306,
      user: 'profedex',
      password: 'profedex_secret',
      database: 'profedex',
    });
    this.reader = new PrismaClientMySql({ adapter: mysqlAdapter });
  }

  async onModuleInit() {
    await this.writer.$connect();
    await this.reader.$connect();
  }

  async onModuleDestroy() {
    await this.writer.$disconnect();
    await this.reader.$disconnect();
  }
}
