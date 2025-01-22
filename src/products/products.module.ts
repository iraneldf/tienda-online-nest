import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // Importa AuthModule para usar JwtService
  providers: [ProductsService, PrismaService],
  controllers: [ProductsController],
  exports:[ProductsService]
})
export class ProductsModule {}
