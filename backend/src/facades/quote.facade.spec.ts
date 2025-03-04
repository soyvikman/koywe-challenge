import { Test, TestingModule } from '@nestjs/testing';
import { QuoteFacade } from './quote.facade';
import { QuoteService } from '../bll/quote/quote.service';
import { ExchangeRateProvider } from '../providers/exchange-rate/exchange-rate.provider';
import { CreateQuoteDto } from '../models/dtos/quote.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('QuoteFacade', () => {
  let facade: QuoteFacade;
  let quoteService: QuoteService;
  let exchangeRateProvider: ExchangeRateProvider;

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

  const mockQuoteService = {
    createQuote: jest.fn().mockResolvedValue(mockQuote),
    getQuoteById: jest.fn(),
  };

  const mockExchangeRateProvider = {
    getRate: jest.fn().mockResolvedValue(0.0000023),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteFacade,
        {
          provide: QuoteService,
          useValue: mockQuoteService,
        },
        {
          provide: ExchangeRateProvider,
          useValue: mockExchangeRateProvider,
        },
      ],
    }).compile();

    facade = module.get<QuoteFacade>(QuoteFacade);
    quoteService = module.get<QuoteService>(QuoteService);
    exchangeRateProvider =
      module.get<ExchangeRateProvider>(ExchangeRateProvider);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  it('should create a quote', async () => {
    const createQuoteDto: CreateQuoteDto = {
      from: 'ARS',
      to: 'ETH',
      amount: 1000,
    };

    const result = await facade.createQuote(createQuoteDto);

    expect(exchangeRateProvider.getRate).toHaveBeenCalledWith('ARS', 'ETH');
    expect(quoteService.createQuote).toHaveBeenCalledWith(
      createQuoteDto,
      0.0000023,
    );
    expect(result).toEqual(mockQuote);
  });

  it('should throw NotFoundException if quote does not exist', async () => {
    mockQuoteService.getQuoteById.mockResolvedValueOnce(null);

    await expect(facade.getQuoteById('invalid-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException if quote is expired', async () => {
    const expiredQuote = {
      ...mockQuote,
      expiresAt: new Date(Date.now() - 1000), // ya expiró
    };
    mockQuoteService.getQuoteById.mockResolvedValueOnce(expiredQuote);

    await expect(facade.getQuoteById('expired-id')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return quote if valid', async () => {
    mockQuoteService.getQuoteById.mockResolvedValueOnce(mockQuote);

    const result = await facade.getQuoteById('mock-quote-id');

    expect(result).toEqual(mockQuote);
  });
});
