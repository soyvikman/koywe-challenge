import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FacadeModule } from './facades/facade.module';
import { QuoteController } from './controllers/quote.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    FacadeModule,
    AuthModule,
  ],
  controllers: [AppController, QuoteController],
  providers: [AppService],
})
export class AppModule {}
