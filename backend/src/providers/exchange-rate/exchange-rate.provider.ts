import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRateProvider {
  private readonly logger = new Logger(ExchangeRateProvider.name);

  constructor(private readonly httpService: HttpService) {}

  async getRate(from: string, to: string): Promise<number> {
    const url = `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${from}&to=${to}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));

      const rateData = response.data[from];

      if (!rateData || typeof rateData.price !== 'string') {
        this.logger.error(
          `Invalid response from Exchange API: ${JSON.stringify(response.data)}`,
        );
        throw new InternalServerErrorException(
          `Invalid response from exchange rate provider for ${from} to ${to}`,
        );
      }

      const rate = parseFloat(rateData.price);

      if (isNaN(rate)) {
        this.logger.error(
          `Failed to parse rate for ${from} to ${to}: ${rateData.price}`,
        );
        throw new InternalServerErrorException(
          `Failed to parse exchange rate for ${from} to ${to}`,
        );
      }

      return rate;
    } catch (error) {
      this.logger.error(`Failed to fetch rate for ${from} to ${to}`, error);
      throw new InternalServerErrorException(
        `Failed to fetch rate for ${from} to ${to}`,
      );
    }
  }
}
