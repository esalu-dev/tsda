import { ValidateStudentDto } from 'src/application/dtos/request/validate-student.dto';

export interface ISiitService {
  validateStudent(dto: ValidateStudentDto): Promise<SiitValidationResult>;
}

export type SiitValidationResult =
  | { success: true; career: string }
  | { success: false; error: string };

export const ISiitService = Symbol('ISiitService');
