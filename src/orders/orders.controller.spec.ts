import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import { User } from '../decorators/user.decorator';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    // Crear un módulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService, // Simular el servicio
          useValue: {
            create: jest.fn().mockImplementation((createOrderDto, userId) =>
              Promise.resolve({
                id: '1',
                ...createOrderDto,
                userId,
                total: 100, // Simular un total calculado
              }),
            ),
            findAllByUser: jest.fn().mockResolvedValue([
              {
                id: '1',
                userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                productId: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
                quantity: 2,
                total: 100,
              },
            ]),
            findOne: jest.fn().mockImplementation((id, userId, userRole) =>
              Promise.resolve({
                id,
                userId,
                productId: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
                quantity: 2,
                total: 100,
              }),
            ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard) // Simular el guardia de autenticación
      .useValue({ canActivate: () => true })
      .compile();

    // Obtener las instancias del controlador y el servicio
    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        productId: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
        quantity: 2,
      };

      const user = { sub: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }; // Usuario autenticado

      const result = await controller.create(createOrderDto, user);

      expect(result).toEqual({
        id: '1',
        ...createOrderDto,
        userId: user.sub,
        total: 100,
      });

      expect(service.create).toHaveBeenCalledWith(createOrderDto, user.sub);
    });
  });

  describe('findAll', () => {
    it('should return orders for the authenticated user', async () => {
      const user = { sub: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }; // Usuario autenticado

      const result = await controller.findAll(user);

      expect(result).toEqual([
        {
          id: '1',
          userId: user.sub,
          productId: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
          quantity: 2,
          total: 100,
        },
      ]);

      expect(service.findAllByUser).toHaveBeenCalledWith(user.sub);
    });
  });

  describe('findOne', () => {
    it('should return an order by ID', async () => {
      const orderId = '1';
      const userId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      const userRole = 'user';

      const result = await controller.findOne(orderId, userId, userRole);

      expect(result).toEqual({
        id: orderId,
        userId,
        productId: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
        quantity: 2,
        total: 100,
      });

      expect(service.findOne).toHaveBeenCalledWith(orderId, userId, userRole);
    });
  });

  describe('remove', () => {
    it('should delete an order', async () => {
      const orderId = '1';

      const result = await controller.remove(orderId);

      expect(result).toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith(orderId);
    });
  });
});