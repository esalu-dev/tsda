import { careers } from 'src/domain/constants/careers';

export class MatchesCareerHelper {
  static matchesCareer(searchValue: string) {
    return careers.some((career) => career.value === searchValue);
  }
}
