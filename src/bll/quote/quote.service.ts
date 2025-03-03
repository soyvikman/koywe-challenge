import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from 'src/models/entities/quote.entity';
import { CreateQuoteDto } from 'src/models/dtos/quote.dto';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name) private readonly quoteModel: Model<QuoteDocument>,
  ) {}

  async createQuote(createQuoteDto: CreateQuoteDto, rate: number) {
    const { from, to, amount } = createQuoteDto;
    const convertedAmount = amount * rate;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // todo: Validar si se suman 5 min

    const newQuote = new this.quoteModel({
      from,
      to,
      amount,
      rate,
      convertedAmount,
      timestamp: new Date(),
      expiresAt,
    });

    return await newQuote.save();
  }

  async getQuoteById(id: string) {
    return await this.quoteModel.findById(id).exec();
  }
}
