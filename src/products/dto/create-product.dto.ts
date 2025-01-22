import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres.' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres.' })
  @MaxLength(500, { message: 'La descripción no puede tener más de 500 caracteres.' })
  description: string;

  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un valor positivo.' })
  price: number;

  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @IsPositive({ message: 'El stock debe ser un valor positivo.' })
  stock: number;

  @IsString({ message: 'La categoría debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía.' })
  category: string;
}