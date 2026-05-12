import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  const mockExecutionContext = (
    role: string,
    requiredRoles: string[] | undefined,
  ): ExecutionContext => {
    jest.spyOn(reflector, 'get').mockReturnValue(requiredRoles);
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role } }),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
    } as unknown as ExecutionContext;
  };

  it('debe permitir acceso si no hay roles requeridos', () => {
    const context = mockExecutionContext('USER', undefined);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('debe permitir acceso si el usuario tiene el rol requerido', () => {
    const context = mockExecutionContext('ADMIN', ['ADMIN']);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('debe denegar acceso si el usuario no tiene el rol requerido', () => {
    const context = mockExecutionContext('USER', ['ADMIN']);
    expect(guard.canActivate(context)).toBe(false);
  });

  it('debe permitir acceso si el rol está en la lista de roles permitidos', () => {
    const context = mockExecutionContext('ADMIN', ['USER', 'ADMIN']);
    expect(guard.canActivate(context)).toBe(true);
  });
});
