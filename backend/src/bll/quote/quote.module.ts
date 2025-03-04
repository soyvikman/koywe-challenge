import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteService } from './quote.service';
import { Quote, QuoteSchema } from 'src/models/entities/quote.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
