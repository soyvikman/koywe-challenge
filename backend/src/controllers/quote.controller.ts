import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { QuoteFacade } from '../facades/quote.facade';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Quote } from '../models/entities/quote.entity';

@ApiTags('Quotes')
@ApiBearerAuth()
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva cotización' })
  @ApiResponse({ status: 201, description: 'Cotización creada', type: Quote })
  async createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteFacade.createQuote(createQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cotización por ID' })
  @ApiParam({ name: 'id', description: 'ID de la cotización', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Cotización encontrada',
    type: Quote,
  })
  @ApiResponse({ status: 404, description: 'Cotización no encontrada' })
  async getQuote(@Param('id') id: string) {
    return this.quoteFacade.getQuoteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las cotizaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cotizaciones',
    type: [Quote],
  })
  async getAllQuotes() {
    return this.quoteFacade.getAllQuotes();
  }
}
