import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {
  }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    // Verifica que el producto exista
    const product = await this.prisma.product.findUnique({
      where: { id: createOrderDto.productId },
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Crea la orden
    return this.prisma.order.create({
      data: {
        userId,
        productId: createOrderDto.productId,
        quantity: createOrderDto.quantity,
        total: createOrderDto.total,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { product: true }, // Incluye los detalles del producto
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string, userId: string, userRole: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { product: true }, // Incluye los detalles del producto
    });
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    // Verifica si el usuario es el dueño de la orden o un administrador
    if (order.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('No tienes permiso para acceder a esta orden');
    }

    return order;
  }

  async findOneById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { product: true }, // Incluye los detalles del producto
    });
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }

  async remove(id: string) {
    const order = await this.findOneById(id);
    return this.prisma.order.delete({ where: { id } });
  }
}