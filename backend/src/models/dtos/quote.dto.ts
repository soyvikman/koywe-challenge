import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
