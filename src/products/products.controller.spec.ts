import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    // Crear un módulo de prueba
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService, // Proporcionar el servicio simulado
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Test Product',
              price: 100,
              description: 'Test Description',
              stock: 10,
              category: 'Test Category',
            }),
          },
        },
        {
          provide: PrismaClient, // Simular Prisma Client
          useValue: mockDeep<PrismaClient>(),
        },
      ],
    }).compile();

    // Obtener las instancias del controlador y el servicio
    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      // Llamar al método del controlador
      const result = await controller.findOne('1');

      // Verificar el resultado
      expect(result).toEqual({
        id: '1',
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        category: 'Test Category',
      });

      // Verificar que el método del servicio fue llamado con el ID correcto
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });
});