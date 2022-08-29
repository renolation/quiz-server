import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuizDto } from "./dtos/create-quiz.dto";
import { UpdateQuizDto } from "./dtos/update-quiz.dto";

@Controller("quiz")
export class QuizController {


  constructor(private quizService: QuizService) {
  }

  @Post("/create")
  create(@Body() body: CreateQuizDto) {
    console.log(body);
    const timestamp = Math.floor(Date.now()/1000)
    return this.quizService.create(body.question, body.answers, body.imageUrl, body.answer, body.level,
      body.difficult, body.category, body.isEnable, body.explanation, timestamp);
  }

  @Get("/:id")
  getItemById(@Param("id") id: string) {
    return this.quizService.findOne(parseInt(id));
  }

  @Get()
  getAllItem() {
    return this.quizService.findAll();
  }



  @Patch('/:id')
  updateQuestion(@Param('id') id: string, @Body() body: UpdateQuizDto){
    console.log(body);
    // return JSON.stringify(body);
    return this.quizService.update(parseInt(id), body);

  }

  @Delete('/:id')
  removeQuestion(@Param('id') id: string) {
    return this.quizService.remove(parseInt(id));
  }

}
