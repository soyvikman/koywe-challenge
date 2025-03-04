import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate user with correct credentials', async () => {
    const mockUser = { userId: 'user123', username: 'testuser' };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);

    const result = await strategy.validate('testuser', 'password123');

    expect(authService.validateUser).toHaveBeenCalledWith(
      'testuser',
      'password123',
    );
    expect(result).toEqual(mockUser);
  });

  it('should throw error if user is not found', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(
      strategy.validate('invaliduser', 'password123'),
    ).rejects.toThrow();
  });
});
