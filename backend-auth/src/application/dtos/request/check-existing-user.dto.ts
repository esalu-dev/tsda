import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CheckExistingUserDto {
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
}
