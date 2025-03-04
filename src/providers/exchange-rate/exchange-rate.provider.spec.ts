import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ExchangeRateProvider } from './exchange-rate.provider';
import { of, throwError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('ExchangeRateProvider', () => {
  let provider: ExchangeRateProvider;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeRateProvider,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<ExchangeRateProvider>(ExchangeRateProvider);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should fetch rate successfully', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        ARS: {
          price: '0.0000023',
        },
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
        url: 'https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=ARS&to=ETH',
        method: 'get',
        timeout: 0,
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

    const rate = await provider.getRate('ARS', 'ETH');

    expect(httpService.get).toHaveBeenCalledWith(
      `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=ARS&to=ETH`,
    );
    expect(rate).toBe(0.0000023);
  });

  it('should throw InternalServerErrorException on request failure', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(() => new Error('Request failed')));

    await expect(provider.getRate('ARS', 'ETH')).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
