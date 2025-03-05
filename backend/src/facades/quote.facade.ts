import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { QuoteService } from '../bll/quote/quote.service';
import { CreateQuoteDto } from 'src/models/dtos/quote.dto';
import { ExchangeRateProvider } from '../providers/exchange-rate/exchange-rate.provider';

@Injectable()
export class QuoteFacade {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly exchangeRateProvider: ExchangeRateProvider,
  ) {}

  async createQuote(createQuoteDto: CreateQuoteDto) {
    const rate = await this.exchangeRateProvider.getRate(
      createQuoteDto.from,
      createQuoteDto.to,
    );

    if (typeof rate !== 'number' || isNaN(rate)) {
      throw new BadRequestException(
        `Invalid exchange rate received for ${createQuoteDto.from} to ${createQuoteDto.to}`,
      );
    }

    return this.quoteService.createQuote(createQuoteDto, rate);
  }

  async getQuoteById(id: string) {
    const quote = await this.quoteService.getQuoteById(id);

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    const now = new Date();
    if (now > quote.expiresAt) {
      throw new BadRequestException(`Quote with ID ${id} has expired`);
    }

    return quote;
  }

  async getAllQuotes() {
    return this.quoteService.getAllQuotes();
  }
}
