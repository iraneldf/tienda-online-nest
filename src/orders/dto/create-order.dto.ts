import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío.' })
  userId: string;

  @IsUUID('4', { message: 'El ID del producto debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío.' })
  productId: string;

  @IsNumber({}, { message: 'La cantidad debe ser un número.' })
  @IsPositive({ message: 'La cantidad debe ser un valor positivo.' })
  @IsNotEmpty({ message: 'La cantidad no puede estar vacía.' })
  quantity: number;

  // @IsNumber({}, { message: 'El total debe ser un número.' })
  // @IsPositive({ message: 'El total debe ser un valor positivo.' })
  // @IsNotEmpty({ message: 'El total no puede estar vacío.' })
  // total: number;
}