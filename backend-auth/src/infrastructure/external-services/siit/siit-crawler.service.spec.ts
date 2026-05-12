import { Test, TestingModule } from '@nestjs/testing';
import { SiitCrawlerService } from './siit-crawler.service';
import { MatchesCareerHelper } from 'src/infrastructure/helpers/matchesCareer.helper';

// For cheerio, we just mock load directly since we use import { load }
jest.mock('cheerio', () => ({
  load: jest.fn(),
}));
import { load } from 'cheerio';

// For node-fetch, since the test/mocks/node-fetch.js exports jest.fn(),
// we just import it like this:
import fetch from 'node-fetch';


describe('SiitCrawlerService', () => {
  let service: SiitCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiitCrawlerService],
    }).compile();

    service = module.get<SiitCrawlerService>(SiitCrawlerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateStudent', () => {
    it('debe retornar error si no se puede iniciar sesión (sin cookie)', async () => {
      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        headers: { get: jest.fn().mockReturnValue(null) },
      });

      const result = await service.validateStudent({ numControl: 'a', pin: 'b' });

      expect(result).toEqual({ success: false, error: 'No se pudo iniciar sesión' });
    });

    it('debe retornar error de credenciales inválidas si no encuentra la carrera', async () => {
      (fetch as unknown as jest.Mock).mockReset();
      (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('acceso.php')) {
          return Promise.resolve({ headers: { get: () => 'PHPSESSID=123' } });
        }
        if (url.includes('avance_reticular.php')) {
          return Promise.resolve({ text: () => Promise.resolve('<html></html>') });
        }
        return Promise.resolve({});
      });

      const rootMock = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnThis(),
        text: jest.fn().mockReturnValue(''),
      });
      (load as jest.Mock).mockReturnValue(rootMock);
      // Simular que el text final devuelve vacío
      rootMock().text.mockReturnValue('');

      const result = await service.validateStudent({ numControl: 'a', pin: 'b' });

      expect(result).toEqual({ success: false, error: 'Credenciales inválidas' });
    });

    it('debe retornar success si la carrera existe y está permitida', async () => {
      (fetch as unknown as jest.Mock).mockReset();
      (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('acceso.php')) {
          return Promise.resolve({ headers: { get: () => 'PHPSESSID=123' } });
        }
        if (url.includes('avance_reticular.php')) {
          return Promise.resolve({ text: () => Promise.resolve('<html></html>') });
        }
        return Promise.resolve({});
      });

      const rootMock = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnThis(),
        text: jest.fn().mockReturnValue(' ISC ')
      });
      (load as jest.Mock).mockReturnValue(rootMock);

      jest.spyOn(MatchesCareerHelper, 'matchesCareer').mockReturnValue(true);

      const result = await service.validateStudent({ numControl: 'a', pin: 'b' });

      expect(result).toEqual({ success: true, career: 'ISC' });
    });

    it('debe retornar error si la carrera existe pero no está permitida', async () => {
      (fetch as unknown as jest.Mock).mockReset();
      (fetch as unknown as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('acceso.php')) {
          return Promise.resolve({ headers: { get: () => 'PHPSESSID=123' } });
        }
        if (url.includes('avance_reticular.php')) {
          return Promise.resolve({ text: () => Promise.resolve('<html></html>') });
        }
        return Promise.resolve({});
      });

      const rootMock = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnThis(),
        text: jest.fn().mockReturnValue(' INVENTADA ')
      });
      (load as jest.Mock).mockReturnValue(rootMock);

      jest.spyOn(MatchesCareerHelper, 'matchesCareer').mockReturnValue(false);

      const result = await service.validateStudent({ numControl: 'a', pin: 'b' });

      expect(result).toEqual({ success: false, error: 'Profedex no está disponible para tu carrera. Consulta los términos y condiciones para saber más.' });
    });
  });
});
