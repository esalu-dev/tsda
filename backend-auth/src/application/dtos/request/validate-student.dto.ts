import { IsString, MaxLength, MinLength } from 'class-validator';

export class ValidateStudentDto {
  @IsString({ message: 'El número de control debe ser una cadena' })
  @MinLength(8, {
    message: 'El número de control debe tener al menos 8 caracteres',
  })
  @MaxLength(8, {
    message: 'El número de control debe tener al menos 8 caracteres',
  })
  numControl: string;

  @IsString({ message: 'El pin debe ser una cadena' })
  @MinLength(4, { message: 'El pin debe tener 4 caracteres' })
  @MaxLength(4, { message: 'El pin debe tener 4 caracteres' })
  pin: string;
}
