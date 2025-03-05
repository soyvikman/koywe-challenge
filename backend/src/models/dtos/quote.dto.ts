import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({ example: 'ARS', description: 'Moneda origen (código ISO)' })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({ example: 'ETH', description: 'Moneda destino (código ISO)' })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({ example: 1000, description: 'Monto a convertir' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
