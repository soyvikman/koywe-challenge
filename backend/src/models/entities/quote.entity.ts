import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  @ApiProperty({ example: 'ARS', description: 'Moneda origen' })
  @Prop({ required: true })
  from: string;

  @ApiProperty({ example: 'ETH', description: 'Moneda destino' })
  @Prop({ required: true })
  to: string;

  @ApiProperty({ example: 1000, description: 'Monto a convertir' })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({ example: 0.0000023, description: 'Tasa de conversión' })
  @Prop({ required: true })
  rate: number;

  @ApiProperty({ example: 0.0023, description: 'Monto convertido' })
  @Prop({ required: true })
  convertedAmount: number;

  @ApiProperty({
    example: '2025-03-04T12:00:00Z',
    description: 'Fecha de creación de la cotización',
  })
  @Prop({ default: Date.now })
  timestamp: Date;

  @ApiProperty({
    example: '2025-03-04T12:05:00Z',
    description: 'Fecha de expiración de la cotización',
  })
  @Prop({ required: true })
  expiresAt: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
