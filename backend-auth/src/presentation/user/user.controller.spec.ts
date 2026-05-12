import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { default as supertest } from 'supertest';
import { UserController } from './user.controller';
import { CheckUserBanInfoUseCase } from 'src/application/use-cases/user/check-user-ban-info.use-case';
import { BanUserUseCase } from 'src/application/use-cases/user/ban-user.use-case';
import { GetUsersByConflictKeys } from 'src/application/use-cases/user/get-users-by-conflict-keys.use-case';
import { UnbanUserUseCase } from 'src/application/use-cases/user/unban-user.use-case';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';

// Mock guard que siempre permite el acceso como ADMIN
const mockJwtAuthGuard = { canActivate: () => true };
const mockRolesGuard = { canActivate: () => true };

describe('UserController (Integration)', () => {
  let app: INestApplication;

  const mockCheckBanInfoUseCase = { execute: jest.fn() };
  const mockBanUserUseCase = { execute: jest.fn() };
  const mockGetUsersByConflictKeys = { execute: jest.fn() };
  const mockUnbanUserUseCase = { execute: jest.fn() };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CheckUserBanInfoUseCase, useValue: mockCheckBanInfoUseCase },
        { provide: BanUserUseCase, useValue: mockBanUserUseCase },
        {
          provide: GetUsersByConflictKeys,
          useValue: mockGetUsersByConflictKeys,
        },
        { provide: UnbanUserUseCase, useValue: mockUnbanUserUseCase },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /user/ban-info', () => {
    it('debe retornar 200 con la info del ban', async () => {
      const ban = { id: 'ban-1', reason: 'Spam', duration: null };
      mockCheckBanInfoUseCase.execute.mockResolvedValue(ban);

      const res = await supertest(app.getHttpServer())
        .get('/user/ban-info')
        .query({ email: 'user@mail.com' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(ban);
    });
  });

  describe('POST /user/ban-user', () => {
    it('debe retornar 201 al banear un usuario', async () => {
      const banResult = { id: 'ban-1', reason: 'Spam', duration: null };
      mockBanUserUseCase.execute.mockResolvedValue(banResult);

      const res = await supertest(app.getHttpServer())
        .post('/user/ban-user')
        .send({ userId: 'user-1', reason: 'Spam' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(banResult);
    });
  });

  describe('POST /user/unban-user', () => {
    it('debe retornar 200 al desbanear un usuario', async () => {
      mockUnbanUserUseCase.execute.mockResolvedValue(undefined);

      const res = await supertest(app.getHttpServer())
        .post('/user/unban-user')
        .send({ banId: 'ban-123' });

      expect(res.status).toBe(200);
      expect(mockUnbanUserUseCase.execute).toHaveBeenCalledWith('ban-123');
    });
  });

  describe('GET /user/get-users-by-conflict-keys', () => {
    it('debe retornar 200 con los usuarios encontrados', async () => {
      const users = [
        {
          id: '1',
          email: 'user@mail.com',
          username: 'juan',
          numControl: '20250001',
          bannings: null,
        },
      ];
      mockGetUsersByConflictKeys.execute.mockResolvedValue(users);

      const res = await supertest(app.getHttpServer())
        .get('/user/get-users-by-conflict-keys')
        .query({ query: 'juan' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(users);
    });
  });
});
