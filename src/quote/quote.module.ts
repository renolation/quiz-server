import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { CloudStorageService } from "../core/services/cloud-storage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quote } from "./entity/quote.entity";
import { StyleText } from "./entity/style_text.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote, StyleText])
  ],
  providers: [QuoteService, CloudStorageService],
  controllers: [QuoteController]
})
export class QuoteModule {}
