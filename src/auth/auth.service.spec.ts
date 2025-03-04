import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../bll/user/user.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUser = {
    _id: 'mock-user-id',
    username: 'testuser',
    password: 'hashedpassword123',
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user with correct password', async () => {
    mockUserService.findOne.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await service.validateUser('testuser', 'plainpassword');

    expect(userService.findOne).toHaveBeenCalledWith('testuser');
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'plainpassword',
      mockUser.password,
    );
    expect(result).toEqual({ _id: 'mock-user-id', username: 'testuser' });
  });

  it('should return null if user not found', async () => {
    mockUserService.findOne.mockResolvedValue(null);

    const result = await service.validateUser('testuser', 'plainpassword');

    expect(result).toBeNull();
  });

  it('should return null if password is incorrect', async () => {
    mockUserService.findOne.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const result = await service.validateUser('testuser', 'wrongpassword');

    expect(result).toBeNull();
  });

  it('should return JWT token on login', async () => {
    const result = await service.login({
      username: 'testuser',
      userId: 'mock-user-id',
    });

    expect(jwtService.sign).toHaveBeenCalledWith({
      username: 'testuser',
      sub: 'mock-user-id',
    });
    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
  });
});
