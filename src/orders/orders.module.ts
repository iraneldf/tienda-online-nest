import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // Importa AuthModule para usar JwtService
  providers: [OrdersService, PrismaService],
  controllers: [OrdersController],
  exports: [OrdersService], // Exporta UsersService para que otros módulos puedan usarlo
})
export class OrdersModule {}
