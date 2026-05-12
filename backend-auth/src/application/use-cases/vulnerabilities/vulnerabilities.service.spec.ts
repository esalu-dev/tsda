import { Test, TestingModule } from '@nestjs/testing';
import { VulnerabilitiesService } from './vulnerabilities.service';
import { PrismaService } from '../../../infrastructure/prisma/context/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as child_process from 'child_process';
import * as fs from 'fs';

jest.mock('child_process');
jest.mock('fs');

describe('VulnerabilitiesService', () => {
  let service: VulnerabilitiesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VulnerabilitiesService,
        {
          provide: PrismaService,
          useValue: {
            writer: {
              $queryRawUnsafe: jest.fn(),
              $queryRaw: jest.fn(),
            },
            reader: {
              user: {
                findUnique: jest.fn(),
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<VulnerabilitiesService>(VulnerabilitiesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('XSS', () => {
    it('should return vulnerable HTML without escaping', () => {
      const result = service.getVulnerableXss('<script>alert(1)</script>');
      expect(result).toContain('<script>alert(1)</script>');
    });

    it('should return secure HTML with escaped characters', () => {
      const result = service.getSecureXss('<script>alert(1)</script>');
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
    });
  });

  describe('Spoofing', () => {
    it('should return spoofed data if userId is provided (Vulnerable)', async () => {
      (prisma.reader.user.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@mail.com',
        username: 'juan',
        numControl: '20250001',
        role: 'student',
      });

      const result = await service.getVulnerableSpoofingData('123');
      expect(prisma.reader.user.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
        select: {
          id: true,
          email: true,
          username: true,
          numControl: true,
          role: true,
        },
      });
      expect(result.data.userId).toBe('123');
      expect(result.data.secretInfo).toContain('juan');
    });

    it('should throw BadRequest if no userId is provided (Vulnerable)', async () => {
      await expect(service.getVulnerableSpoofingData('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFound if user does not exist (Vulnerable)', async () => {
      (prisma.reader.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getVulnerableSpoofingData('123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return secure data from verified token', async () => {
      (prisma.reader.user.findUnique as jest.Mock).mockResolvedValue({
        id: '456',
        email: 'secure@mail.com',
        username: 'ana',
        numControl: '20250002',
        role: 'admin',
      });

      const result = await service.getSecureSpoofingData('456');
      expect(result.data.userId).toBe('456');
      expect(result.data.secretInfo).toContain('autenticado');
      expect(result.data.username).toBe('ana');
    });

    it('should throw BadRequest if authenticated user id is missing', async () => {
      await expect(service.getSecureSpoofingData('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('File Handling', () => {
    it('should throw BadRequest if no file is provided', () => {
      expect(() => service.readSecureFile('', 'dir')).toThrow(BadRequestException);
    });

    it('should return file content if file exists (Secure)', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue('file content');
      
      const result = service.readSecureFile('test.txt', '/var/www');
      expect(result).toBe('file content');
    });

    it('should throw error if file does not exist (Secure)', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      expect(() => service.readSecureFile('test.txt', '/var/www')).toThrow('Error leyendo el archivo. (SEGURO)');
    });
  });

  describe('SQL Injection', () => {
    it('should call $queryRawUnsafe (Vulnerable)', async () => {
      (prisma.writer.$queryRawUnsafe as jest.Mock).mockResolvedValue([{ id: 1 }]);
      const result = await service.executeVulnerableSql('admin');
      
      expect(prisma.writer.$queryRawUnsafe).toHaveBeenCalledWith(expect.stringContaining('admin'));
      expect(result.result).toEqual([{ id: 1 }]);
    });

    it('should call $queryRaw (Secure)', async () => {
      (prisma.writer.$queryRaw as jest.Mock).mockResolvedValue([{ id: 1 }]);
      const result = await service.executeSecureSql('admin');
      
      expect(prisma.writer.$queryRaw).toHaveBeenCalled();
      expect(result.result).toEqual([{ id: 1 }]);
    });
  });

  describe('Command Injection', () => {
    it('should throw error for invalid IP (Secure)', () => {
      expect(() => service.executeSecureCommand('invalid-ip; rm -rf /')).toThrow(BadRequestException);
    });

    it('should execute command for valid IP (Secure)', async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementation((cmd, cb) => cb(null, 'ok', ''));
      const result = await service.executeSecureCommand('127.0.0.1');
      expect(result.stdout).toBe('ok');
    });

    it('should execute any command (Vulnerable)', async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementation((cmd, cb) => cb(null, 'hacked', ''));
      const result = await service.executeVulnerableCommand('127.0.0.1; echo hacked');
      expect(result.stdout).toBe('hacked');
      expect(result.commandExecuted).toContain('echo hacked');
    });
  });
});
