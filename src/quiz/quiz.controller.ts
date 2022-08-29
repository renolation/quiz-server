import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {


    constructor(private quizServer: QuizService){}

    @Get()
    async test(){
         console.log('abc');
         return 'abc';
    }
    @Post('/create')
    create(@Body() body: any){
        console.log(body);  
        return this.quizServer.create(body.question, body.answers, body.imageUrl, body.answer,body.level, body.difficult, body.category, body.isEnable, body.explaination, body.timestamp);

    }
        

}
