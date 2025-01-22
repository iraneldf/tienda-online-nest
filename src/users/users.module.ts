import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule

@Module({
  imports: [forwardRef(() => AuthModule)], // Usa forwardRef para evitar dependencias circulares
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta UsersService para que otros módulos puedan usarlo
})
export class UsersModule {}