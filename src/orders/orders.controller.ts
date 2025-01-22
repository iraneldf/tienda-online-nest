import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth/auth.guard';
import { User } from '../decorators/user.decorator';

@ApiTags('Órdenes')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva orden (el total se calcula automáticamente)' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiBody({
    schema: {
      type: 'object',
      example: { // Ejemplo preescrito en el campo raw
        userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        productId: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
        quantity: 2,
      },
    },
  })
  create(@Body() createOrderDto: CreateOrderDto, @User() user: { sub: string }) {
    const userId = user.sub; // Obtiene el ID del usuario autenticado
    return this.ordersService.create(createOrderDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener las órdenes del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findAll(@User() user: { sub: string }) {
    const userId = user.sub; // Obtiene el ID del usuario autenticado
    return this.ordersService.findAllByUser(userId);
  }

  // @Get()
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Obtener todas las órdenes' })
  // @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida.' })
  // @ApiResponse({ status: 401, description: 'No autorizado.' })
  // findAll() {
  //   return this.ordersService.findAll();
  // }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden encontrada.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  findOne(id: string, userId: string, userRole: string) {
    return this.ordersService.findOne(id, userId, userRole);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una orden' })
  @ApiResponse({ status: 200, description: 'Orden eliminada.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}