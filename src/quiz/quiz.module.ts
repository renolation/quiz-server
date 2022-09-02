import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { CloudStorageService } from "../core/services/cloud-storage.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question])
  ],
  providers: [QuizService, CloudStorageService],
  controllers: [QuizController]
})
export class QuizModule {}
