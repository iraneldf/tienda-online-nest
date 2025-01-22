import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth/auth.guard';
import { RolesGuard } from '../guards/auth/roles.guard';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) // Solo los admins pueden crear productos
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para realizar esta acción.' })
  @ApiBody({
    schema: {
      type: 'object',
      example: { // Ejemplo preescrito en el campo raw
        name: 'Producto de ejemplo',
        description: 'Este es un producto de ejemplo con una descripción.',
        price: 19.99,
        stock: 100,
        category: 'Electrónica',
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos paginados' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Límite de productos por página' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Filtrar por precio mínimo' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Filtrar por precio máximo' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.productsService.findAll(page, limit, category, minPrice, maxPrice);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) // Solo los admins pueden actualizar productos
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para realizar esta acción.' })
  @ApiBody({
    schema: {
      type: 'object',
      example: { // Ejemplo preescrito en el campo raw
        name: 'Producto de ejemplo',
        description: 'Este es un producto de ejemplo con una descripción.',
        price: 19.99,
        stock: 100,
        category: 'Electrónica',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) // Solo los admins pueden eliminar productos
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para realizar esta acción.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}