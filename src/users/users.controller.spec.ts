import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(), // Mock del servicio
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('debe devolver una lista de usuarios', async () => {
    // Mock de la respuesta del servicio
    const mockUsers = [{ id: 1, name: 'Juan Pérez', email: 'juan@example.com' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

    // Ejecutar el método del controlador y verificar el resultado
    const result = await controller.findAll();
    expect(result).toEqual(mockUsers);
    expect(service.findAll).toHaveBeenCalled();
  });
});