import { Module } from '@nestjs/common';
import { QuoteFacade } from './quote.facade';
import { QuoteModule } from '../bll/quote/quote.module';
import { ExchangeRateModule } from 'src/providers/exchange-rate/exchange-rate.module';

@Module({
  imports: [QuoteModule, ExchangeRateModule],
  providers: [QuoteFacade],
  exports: [QuoteFacade],
})
export class FacadeModule {}
