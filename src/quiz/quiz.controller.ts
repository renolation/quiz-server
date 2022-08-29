import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuizDto } from "./dtos/create-quiz.dto";

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

  

}
