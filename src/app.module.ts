import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';
import { Quote } from "./quote/entity/quote.entity";
import { StyleText } from "./quote/entity/style_text.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '104.198.7.141',
      port: 5432,
      username: 'phuocnguyen',
      password: 'renolation29',
      database: 'quotes',
      entities: [Quote, StyleText],
      synchronize: true,
    }),
    QuoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
