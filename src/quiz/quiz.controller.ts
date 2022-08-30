import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuizDto } from "./dtos/create-quiz.dto";
import { UpdateQuizDto } from "./dtos/update-quiz.dto";
import { CreateImageQuizDto } from "./dtos/create-image-quiz.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("quiz")
export class QuizController {


  constructor(private quizService: QuizService) {
  }

  @Post("/create")
  create(@Body() body: CreateQuizDto) {
    console.log(body);
    const timestamp = Math.floor(Date.now() / 1000);
    return this.quizService.create(body.question, body.answers, body.imageUrl, body.answer, body.level,
      body.difficult, body.category, body.isEnable, body.explanation, timestamp);
  }

  @Post("/createImage")
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: "option1", maxCount: 1 },
      { name: "option2", maxCount: 1 },
      { name: "option3", maxCount: 1 },
      { name: "option4", maxCount: 1 }
    ]
  ))
  createImageAnswers(@Body() body: CreateImageQuizDto, @UploadedFiles() files: {
    option1?: Express.Multer.File[],
    option2?: Express.Multer.File[],
    option3?: Express.Multer.File[],
    option4?: Express.Multer.File[]
  }) {
    console.log(body);
    const timestamp = Math.floor(Date.now() / 1000);
    let answers = [];
    console.log(files);

    // return this.quizService.create(body.question, answers, body.imageUrl, body.answer, body.level,
    //   body.difficult, body.category, body.isEnable, body.explanation, timestamp);
  }


  @Get("/:id")
  getItemById(@Param("id") id: string) {
    return this.quizService.findOne(parseInt(id));
  }

  @Get()
  getAllItem() {
    return this.quizService.findAll();
  }


  @Patch("/:id")
  updateQuestion(@Param("id") id: string, @Body() body: UpdateQuizDto) {
    console.log(body);
    // return JSON.stringify(body);
    return this.quizService.update(parseInt(id), body);

  }

  @Delete("/:id")
  removeQuestion(@Param("id") id: string) {
    return this.quizService.remove(parseInt(id));
  }

}
