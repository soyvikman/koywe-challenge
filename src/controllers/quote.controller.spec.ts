import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteFacade } from '../facades/quote.facade';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';

describe('QuoteController', () => {
  let controller: QuoteController;
  let facade: QuoteFacade;

  const mockQuote = {
    id: 'mock-quote-id',
    from: 'ARS',
    to: 'ETH',
    amount: 1000,
    rate: 0.0000023,
    convertedAmount: 0.0023,
    timestamp: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };

  const mockFacade = {
    createQuote: jest.fn().mockResolvedValue(mockQuote),
    getQuoteById: jest.fn().mockResolvedValue(mockQuote),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteFacade,
          useValue: mockFacade,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // 🔥 Evitar que el guard real interfiera
      .useValue({
        canActivate: (context: ExecutionContext) => true, // Simular siempre autenticado
      } as CanActivate)
      .compile();

    controller = module.get<QuoteController>(QuoteController);
    facade = module.get<QuoteFacade>(QuoteFacade);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a quote', async () => {
    const createQuoteDto: CreateQuoteDto = {
      from: 'ARS',
      to: 'ETH',
      amount: 1000,
    };

    const result = await controller.createQuote(createQuoteDto);

    expect(facade.createQuote).toHaveBeenCalledWith(createQuoteDto);
    expect(result).toEqual(mockQuote);
  });

  it('should get a quote by ID', async () => {
    const result = await controller.getQuote('mock-quote-id');

    expect(facade.getQuoteById).toHaveBeenCalledWith('mock-quote-id');
    expect(result).toEqual(mockQuote);
  });
});
