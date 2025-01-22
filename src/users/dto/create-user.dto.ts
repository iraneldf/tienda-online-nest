import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'El nombre del usuario',
  })
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
  @ApiProperty({
    example: 'juan@example.com',
    description: 'El correo electrónico del usuario',
  })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacío.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres.' })
  @ApiProperty({
    example: 'password123',
    description: 'La contraseña del usuario',
  })
  password: string;

  @IsString({ message: 'El rol debe ser una cadena de texto.' })
  @IsOptional() // Hace que el campo sea opcional
  @ApiPropertyOptional({
    example: 'user',
    description: 'El rol del usuario (opcional, por defecto es "user")',
  })
  role?: string = 'user'; // Valor por defecto
}