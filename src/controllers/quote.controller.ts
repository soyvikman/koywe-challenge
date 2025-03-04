import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { QuoteFacade } from '../facades/quote.facade';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteFacade.createQuote(createQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getQuote(@Param('id') id: string) {
    return this.quoteFacade.getQuoteById(id);
  }
}
