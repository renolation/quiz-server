import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {


    constructor(private quizService: QuizService){}

    @Get()
    async test(){
         console.log('abc');
         return 'abc';
    }
    @Post('/create')
    create(@Body() body: any){
        console.log(body);  
        return this.quizService.create(body.question, body.answers, body.imageUrl, body.answer,body.level, body.difficult, body.category, body.isEnable, body.explaination, body.timestamp);
    }
    @Get('/:id')
    getItemById(@Param('id') id: string){
        return this.quizService.findOne(parseInt(id));

    }

}
