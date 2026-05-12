import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    const mockConfigService = {
      getOrThrow: jest.fn().mockReturnValue('test-secret'),
    } as unknown as ConfigService;

    strategy = new JwtStrategy(mockConfigService);
  });

  it('debe transformar el payload JWT al formato correcto', () => {
    const payload = {
      sub: 'user-1',
      email: 'user@mail.com',
      role: 'USER',
      career: 'ISC',
      username: 'juan',
    };

    const result = strategy.validate(payload);

    expect(result).toEqual({
      userId: 'user-1',
      email: 'user@mail.com',
      role: 'USER',
      career: 'ISC',
      username: 'juan',
    });
  });

  it('debe mapear sub a userId', () => {
    const payload = {
      sub: 'abc-123',
      email: 'test@mail.com',
      role: 'ADMIN',
      career: 'IIA',
      username: 'admin',
    };

    const result = strategy.validate(payload);

    expect(result.userId).toBe('abc-123');
    expect(result.role).toBe('ADMIN');
  });
});
