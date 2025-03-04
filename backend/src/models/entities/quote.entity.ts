import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  convertedAmount: number;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ required: true })
  expiresAt: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
