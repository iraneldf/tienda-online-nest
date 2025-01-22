import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'El nombre del usuario',
  })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @ApiProperty({
    example: 'juan@example.com',
    description: 'El correo electrónico del usuario',
  })
  email?: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres.' })
  @ApiProperty({
    example: 'password123',
    description: 'La contraseña del usuario',
  })
  password?: string;
}