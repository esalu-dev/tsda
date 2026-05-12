import { Injectable } from '@nestjs/common';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';
import { PrismaService } from '../context/prisma.service';
import { Bannings } from 'generated/prisma-pg/client';
import { BanningsCreateInput } from 'generated/prisma-pg/models';

@Injectable()
export class BanningsPrismaRepository implements IBanningsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Pure read-only query → MySQL replica
  async findByEmail(email: string): Promise<Bannings | null> {
    return this.prisma.reader.bannings.findFirst({
      where: { user: { email } },
    });
  }

  async create(ban: BanningsCreateInput): Promise<Bannings> {
    return this.prisma.writer.bannings.create({ data: ban });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.writer.bannings.delete({ where: { id } });
  }
}
