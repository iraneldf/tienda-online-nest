import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../guards/auth/auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'tu_clave_secreta', // Cambia esto por una clave segura
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule), // Usa forwardRef para evitar dependencias circulares
  ],
  providers: [AuthService, JwtStrategy, PrismaService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Exporta JwtModule
})
export class AuthModule {}