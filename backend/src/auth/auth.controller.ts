import { CreateUserDto } from './../models/dtos/create-user-dto';
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../bll/user/user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Registro de nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado y logueado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerWithToken(
      createUserDto.username,
      createUserDto.password,
    );
  }
}
