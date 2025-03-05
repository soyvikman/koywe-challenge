import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user123', description: 'Nombre de usuario' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'mypassword123',
    description: 'Contraseña',
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
