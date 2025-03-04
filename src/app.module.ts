import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FacadeModule } from './facades/facade.module';
import { QuoteController } from './controllers/quote.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, FacadeModule, AuthModule],
  controllers: [AppController, QuoteController],
  providers: [AppService],
})
export class AppModule {}
