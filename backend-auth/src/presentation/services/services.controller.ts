import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ValidateStudentDto } from 'src/application/dtos/request/validate-student.dto';
import { ValidateStudentUseCase } from 'src/application/use-cases/student/validate-student.use-case';
import { SiitValidationResult } from 'src/domain/services/siit.service.interface';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly validateStudentUseCase: ValidateStudentUseCase,
  ) {}
  @HttpCode(200)
  @Post('validate-student')
  validateStudent(
    @Body() dto: ValidateStudentDto,
  ): Promise<SiitValidationResult> {
    return this.validateStudentUseCase.execute(dto);
  }
}
