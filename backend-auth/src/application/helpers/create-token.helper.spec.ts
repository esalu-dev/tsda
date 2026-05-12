import { CreateTokenHelper } from './create-token.helper';
import { v4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid-123'),
}));

describe('CreateTokenHelper', () => {
  it('debe retornar un string UUID usando v4', () => {
    const token = CreateTokenHelper.createToken();
    expect(v4).toHaveBeenCalled();
    expect(token).toBe('mocked-uuid-123');
  });
});
