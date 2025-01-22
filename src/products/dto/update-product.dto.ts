import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres.' })
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'El nombre del usuario',
  })
  name?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres.' })
  @MaxLength(500, { message: 'La descripción no puede tener más de 500 caracteres.' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un valor positivo.' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @IsPositive({ message: 'El stock debe ser un valor positivo.' })
  stock?: number;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto.' })
  category?: string;
}