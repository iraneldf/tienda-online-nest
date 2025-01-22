import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
  ) {
    const skip = (page - 1) * limit; // Cálculo del offset para la paginación

    const where = {}; // Estos son los filtros dinámicos
    if (category) {
      where['category'] = category;
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where['price'] = {};
      if (minPrice !== undefined) {
        where['price']['gte'] = minPrice;
      }
      if (maxPrice !== undefined) {
        where['price']['lte'] = maxPrice;
      }
    }

    const products = await this.prisma.product.findMany({
      skip,
      take: limit,
      where,
    });

    const total = await this.prisma.product.count({ where });

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}