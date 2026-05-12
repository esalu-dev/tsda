import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'Username no válido' })
  @IsNotEmpty({ message: 'El username es requerido' })
  @MinLength(4, { message: 'El username debe tener al menos 4 caracteres' })
  @MaxLength(30, { message: 'El username debe tener al menos 30 caracteres' })
  @Matches(/^[a-zA-Z0-9_ñÑ]+$/, {
    message: 'El username debe contener solo letras, números y guiones bajos',
  })
  username: string;

  @IsString({ message: 'Password no válido' })
  @IsNotEmpty({ message: 'El password es requerido' })
  @MinLength(6, { message: 'El password debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'NumControl no válido' })
  @IsNotEmpty({ message: 'El número de control es requerido' })
  @MinLength(8, { message: 'Número de control inválido' })
  @MaxLength(9, { message: 'Número de control inválido' })
  numControl: string;

  @IsString({ message: 'Carrera no válida' })
  @IsNotEmpty({ message: 'La carrera es requerida' })
  carrera: string;
}
