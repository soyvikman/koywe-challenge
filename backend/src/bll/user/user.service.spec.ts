import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserDocument } from 'src/models/entities/user.entity';
import * as bcrypt from 'bcrypt';

const mockUser = {
  _id: 'mock-user-id',
  username: 'testuser',
  password: 'hashedpassword123',
};

class MockUserModel {
  constructor(private data) {}

  static findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUser),
  });

  save = jest.fn().mockResolvedValue(this.data); // save en instancia
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel, // Ojo: aquí es la clase, no un objeto
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by username', async () => {
    const result = await service.findOne('testuser');
    expect(MockUserModel.findOne).toHaveBeenCalledWith({
      username: 'testuser',
    });
    expect(result).toEqual(mockUser);
  });
});
