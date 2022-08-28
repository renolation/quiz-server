import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {


    constructor(private quizServer: QuizService){}

    @Get()
    async test(){
         console.log('abc');
         return 'abc';
    }


}
