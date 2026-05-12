import { HashHelper } from './hash.helper';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('HashHelper', () => {
  describe('hashPassword', () => {
    it('debe encriptar la contraseña usando bcrypt.hash', async () => {
      const mockHash = 'hashedPassword123';
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

      const result = await HashHelper.hashPassword('secreta123');

      expect(bcrypt.hash).toHaveBeenCalledWith('secreta123', 10);
      expect(result).toBe(mockHash);
    });
  });

  describe('comparePassword', () => {
    it('debe comparar la contraseña usando bcrypt.compare y retornar true si coincide', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await HashHelper.comparePassword('secreta123', 'hashedPassword123');

      expect(bcrypt.compare).toHaveBeenCalledWith('secreta123', 'hashedPassword123');
      expect(result).toBe(true);
    });

    it('debe retornar false si no coinciden', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await HashHelper.comparePassword('mala', 'hashedPassword123');

      expect(bcrypt.compare).toHaveBeenCalledWith('mala', 'hashedPassword123');
      expect(result).toBe(false);
    });
  });
});
