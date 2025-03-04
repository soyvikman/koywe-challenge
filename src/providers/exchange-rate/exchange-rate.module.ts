import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateProvider } from './exchange-rate.provider';

@Module({
  imports: [HttpModule],
  providers: [ExchangeRateProvider],
  exports: [ExchangeRateProvider],
})
export class ExchangeRateModule {}
