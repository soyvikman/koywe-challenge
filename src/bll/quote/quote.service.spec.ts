import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { QuoteService } from './quote.service';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from 'src/models/entities/quote.entity';

const mockQuote = {
  _id: 'mock-quote-id',
  from: 'ARS',
  to: 'ETH',
  amount: 1000,
  rate: 0.0000023,
  convertedAmount: 0.0023,
  timestamp: new Date(),
  expiresAt: new Date(Date.now() + 5 * 60 * 1000),
};

(mockQuote as any).save = jest.fn().mockResolvedValue(mockQuote);

const mockQuoteModel = {
  create: jest.fn().mockResolvedValue(mockQuote),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockQuote),
  }),
};

describe('QuoteService', () => {
  let service: QuoteService;
  let model: Model<QuoteDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: getModelToken(Quote.name),
          useValue: mockQuoteModel,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    model = module.get<Model<QuoteDocument>>(getModelToken(Quote.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a quote', async () => {
    const createQuoteDto = {
      from: 'ARS',
      to: 'ETH',
      amount: 1000,
    };
    const rate = 0.0000023;

    const result = await service.createQuote(createQuoteDto, rate);

    expect(model.create).toHaveBeenCalledWith({
      from: 'ARS',
      to: 'ETH',
      amount: 1000,
      rate,
      convertedAmount: 0.0023,
      timestamp: expect.any(Date),
      expiresAt: expect.any(Date),
    });

    expect(result).toEqual(mockQuote);
  });

  it('should get a quote by ID', async () => {
    const result = await service.getQuoteById('mock-quote-id');

    expect(model.findById).toHaveBeenCalledWith('mock-quote-id');
    expect(result).toEqual(mockQuote);
  });
});
