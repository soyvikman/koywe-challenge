import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../bll/user/user.service';
import { CreateUserDto } from '../models/dtos/create-user-dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  const mockUser = {
    id: 'user-id-123',
    username: 'testuser',
  };

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn().mockResolvedValue({ access_token: 'mock-jwt-token' }),
  };

  const mockUserService = {
    createUser: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: CreateUserDto = {
      username: 'testuser',
      password: 'password123',
    };

    const result = await controller.register(dto);

    expect(userService.createUser).toHaveBeenCalledWith(
      'testuser',
      'password123',
    );
    expect(result).toEqual(mockUser);
  });

  it('should return token if login is successful', async () => {
    const body = {
      username: 'testuser',
      password: 'password123',
    };

    mockAuthService.validateUser.mockResolvedValue(mockUser);

    const result = await controller.login(body);

    expect(authService.validateUser).toHaveBeenCalledWith(
      'testuser',
      'password123',
    );
    expect(authService.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });

  it('should return error message if login fails', async () => {
    const body = {
      username: 'testuser',
      password: 'wrongpassword',
    };

    mockAuthService.validateUser.mockResolvedValue(null); // Simula usuario no válido

    const result = await controller.login(body);

    expect(result).toEqual({ message: 'Invalid credentials' });
  });
});
