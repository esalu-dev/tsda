import { Inject, Injectable } from '@nestjs/common';
import { ValidateStudentDto } from 'src/application/dtos/request/validate-student.dto';
import { ISiitService } from 'src/domain/services/siit.service.interface';

@Injectable()
export class ValidateStudentUseCase {
  constructor(
    @Inject(ISiitService) private readonly siitService: ISiitService,
  ) {}

  async execute(dto: ValidateStudentDto) {
    return await this.siitService.validateStudent(dto);
  }
}
