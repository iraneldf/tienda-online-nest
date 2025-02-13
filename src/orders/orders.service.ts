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

    // Calcula el total (precio del producto * cantidad)
    const total = product.price * createOrderDto.quantity;

    // Crea la orden
    return this.prisma.order.create({
      data: {
        userId,
        productId: createOrderDto.productId,
        quantity: createOrderDto.quantity,
        total, // Usa el total calculado
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

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { product: true }, // Incluye los detalles del producto
    });
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
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