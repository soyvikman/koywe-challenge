import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { QuoteModule } from './bll/quote/quote.module';

@Module({
  imports: [DatabaseModule, QuoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
