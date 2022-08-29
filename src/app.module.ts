import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Question } from './quiz/entity/quiz.entity';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.tstdfwkbjwzfzbqgpfvt.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'Renolation29@@',
      database: 'postgres',
      entities: [Question],
      synchronize: true,

    }),
    QuizModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
