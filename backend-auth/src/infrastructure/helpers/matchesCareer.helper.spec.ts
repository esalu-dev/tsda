import { MatchesCareerHelper } from './matchesCareer.helper';
import { careers } from 'src/domain/constants/careers';

describe('MatchesCareerHelper', () => {
  it('debe retornar true si la carrera existe en las constantes', () => {
    if (careers.length > 0) {
      const existingCareer = careers[0].value;
      const result = MatchesCareerHelper.matchesCareer(existingCareer);
      expect(result).toBe(true);
    }
  });

  it('debe retornar false si la carrera no existe', () => {
    const result = MatchesCareerHelper.matchesCareer('NOCARRERA');
    expect(result).toBe(false);
  });
});
