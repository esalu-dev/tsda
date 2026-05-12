import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { default as supertest } from 'supertest';
import { AuthController } from './auth.controller';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/auth/register.use-case';
import { CheckExistingUserUseCase } from 'src/application/use-cases/auth/check-existing-user.use-case';
import { RefreshSessionUseCase } from 'src/application/use-cases/session/refresh-session.use-case';
import { SignOutUseCase } from 'src/application/use-cases/session/sign-out.use-case';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

describe('AuthController (Integration)', () => {
  let app: INestApplication;

  const mockLoginUseCase = { execute: jest.fn() };
  const mockRegisterUseCase = { execute: jest.fn() };
  const mockCheckExistingUserUseCase = { execute: jest.fn() };
  const mockRefreshSessionUseCase = { execute: jest.fn() };
  const mockSignOutUseCase = { execute: jest.fn() };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({
          throttlers: [{ ttl: 60000, limit: 100 }],
        }),
      ],
      controllers: [AuthController],
      providers: [
        { provide: LoginUseCase, useValue: mockLoginUseCase },
        { provide: RegisterUseCase, useValue: mockRegisterUseCase },
        {
          provide: CheckExistingUserUseCase,
          useValue: mockCheckExistingUserUseCase,
        },
        { provide: RefreshSessionUseCase, useValue: mockRefreshSessionUseCase },
        { provide: SignOutUseCase, useValue: mockSignOutUseCase },
      ],
    }).compile();

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

  describe('POST /auth/login', () => {
    it('debe retornar 200 con tokens si las credenciales son válidas', async () => {
      mockLoginUseCase.execute.mockResolvedValue({
        accessToken: 'access-123',
        refreshToken: 'refresh-123',
      });

      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'user@mail.com', password: 'Pass123!' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        accessToken: 'access-123',
        refreshToken: 'refresh-123',
      });
    });

    it('debe retornar 401 si las credenciales son inválidas', async () => {
      mockLoginUseCase.execute.mockRejectedValue(
        new UnauthorizedException('Credenciales inválidas'),
      );

      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'user@mail.com', password: 'wrong' });

      expect(res.status).toBe(401);
    });
  });

  describe('POST /auth/register', () => {
    it('debe retornar 201 al registrar un usuario nuevo', async () => {
      const newUser = {
        id: '1',
        email: 'nuevo@mail.com',
        username: 'nuevo',
      };
      mockRegisterUseCase.execute.mockResolvedValue(newUser);

      const res = await supertest(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'nuevo@mail.com',
          username: 'nuevo',
          password: 'Pass123!',
          numControl: '20250001',
          carrera: 'ISC',
        });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(newUser);
    });

    it('debe retornar 409 si hay un conflicto', async () => {
      mockRegisterUseCase.execute.mockRejectedValue(
        new ConflictException('Email en uso'),
      );

      const res = await supertest(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'existe@mail.com',
          username: 'nuevo',
          password: 'Pass123!',
          numControl: '20250001',
          carrera: 'ISC',
        });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /auth/sign-out', () => {
    it('debe retornar 200 al cerrar sesión', async () => {
      mockSignOutUseCase.execute.mockResolvedValue(undefined);

      const res = await supertest(app.getHttpServer())
        .post('/auth/sign-out')
        .send({ refreshToken: 'token-123' });

      expect(res.status).toBe(200);
      expect(mockSignOutUseCase.execute).toHaveBeenCalledWith('token-123');
    });
  });

  describe('POST /auth/refresh', () => {
    it('debe retornar 200 con nuevos tokens', async () => {
      mockRefreshSessionUseCase.execute.mockResolvedValue({
        accessToken: 'new-access',
        newRefreshToken: 'new-refresh',
      });

      const res = await supertest(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'old-refresh' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        accessToken: 'new-access',
        newRefreshToken: 'new-refresh',
      });
    });

    it('debe retornar 401 si el refresh token es inválido', async () => {
      mockRefreshSessionUseCase.execute.mockRejectedValue(
        new UnauthorizedException('Token inválido'),
      );

      const res = await supertest(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'invalid' });

      expect(res.status).toBe(401);
    });
  });

  describe('POST /auth/check-existing-user', () => {
    it('debe retornar 200 con true si no hay conflictos', async () => {
      mockCheckExistingUserUseCase.execute.mockResolvedValue(true);

      const res = await supertest(app.getHttpServer())
        .post('/auth/check-existing-user')
        .send({ email: 'nuevo@mail.com', username: 'nuevo' });

      expect(res.status).toBe(200);
    });

    it('debe retornar 409 si hay conflicto', async () => {
      mockCheckExistingUserUseCase.execute.mockRejectedValue(
        new ConflictException('Email en uso'),
      );

      const res = await supertest(app.getHttpServer())
        .post('/auth/check-existing-user')
        .send({ email: 'existe@mail.com', username: 'nuevo' });

      expect(res.status).toBe(409);
    });
  });
});
