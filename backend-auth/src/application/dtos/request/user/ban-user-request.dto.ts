import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class BanUserRequestDto {
  @IsNotEmpty({ message: 'El id del user es requerido' })
  userId: string;

  @IsNotEmpty({ message: 'El motivo del ban es requerido' })
  reason: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'La duración debe ser un número entero' },
  )
  @IsPositive({ message: 'La duración debe ser un número positivo' })
  @IsOptional()
  duration?: number;
}
