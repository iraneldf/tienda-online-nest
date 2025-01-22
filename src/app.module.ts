import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthnestController } from './generate/authnest/authnest.controller';
import { AuthLoggingMiddleware } from './auth/logger/logger.middleware';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AuthnestController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthLoggingMiddleware).forRoutes('*');
  }
}