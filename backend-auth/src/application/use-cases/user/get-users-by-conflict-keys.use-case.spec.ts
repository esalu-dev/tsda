import { Test } from '@nestjs/testing';
import { GetUsersByConflictKeys } from './get-users-by-conflict-keys.use-case';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';

describe('GetUsersByConflictKeys', () => {
  let useCase: GetUsersByConflictKeys;

  const mockUserRepo = {
    findFirst5ByConflictKeys: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUsersByConflictKeys,
        { provide: IUserRepository, useValue: mockUserRepo },
      ],
    }).compile();

    useCase = module.get(GetUsersByConflictKeys);
    jest.clearAllMocks();
  });

  it('debe retornar usuarios que coincidan con la búsqueda', async () => {
    const users = [
      {
        id: '1',
        email: 'juan@mail.com',
        username: 'juan',
        numControl: '20250001',
        bannings: null,
      },
    ];
    mockUserRepo.findFirst5ByConflictKeys.mockResolvedValue(users);

    const result = await useCase.execute('juan');

    expect(result).toEqual(users);
    expect(mockUserRepo.findFirst5ByConflictKeys).toHaveBeenCalledWith('juan');
  });

  it('debe retornar array vacío si no hay coincidencias', async () => {
    mockUserRepo.findFirst5ByConflictKeys.mockResolvedValue([]);

    const result = await useCase.execute('noexiste');

    expect(result).toEqual([]);
  });
});
