import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuizDto } from "./dtos/create-quiz.dto";
import { UpdateQuizDto } from "./dtos/update-quiz.dto";
import { CreateImageQuizDto } from "./dtos/create-image-quiz.dto";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { CloudStorageService } from "../core/services/cloud-storage.service";
import { ApiBearerAuth, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { memoryStorage } from "multer";
import { File } from "../core/interfaces/file.interface";
import { Question } from "./entity/question.entity";

@Controller("quiz")
export class QuizController {


  constructor(
    private quizService: QuizService
  ) {
  }

  @Post("/create")
  create(@Body() body: CreateQuizDto) {
    console.log(body);
    const timestamp = Math.floor(Date.now() / 1000);
    return this.quizService.create(body.question, body.answers, body.imageUrl, body.answer, body.level,
      body.difficult, body.category, body.isEnable, body.explanation, timestamp);
  }

  //region create image
  @Post("/createImage")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: "option1", maxCount: 1 },
      { name: "option2", maxCount: 1 },
      { name: "option3", maxCount: 1 },
      { name: "option4", maxCount: 1 }
    ],
    {
      storage: memoryStorage(),
      limits: { fileSize: 2097152 }, // 2MB --- 2*2^20
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png)$/)
          ? callback(null, true)
          : callback(new BadRequestException("Only image files are allowed"), false);
      }
    }
  ))
  async createImageAnswers(@Body() body: CreateImageQuizDto, @UploadedFiles() files: {
    option1?: Express.Multer.File[],
    option2?: Express.Multer.File[],
    option3?: Express.Multer.File[],
    option4?: Express.Multer.File[]
  }) {
    const timestamp = Math.floor(Date.now() / 1000);

    let answers = [];
    const fileOption1 = await this.quizService.uploadFile(files['option1'][0], body, 1,timestamp);
    const fileOption2 = await this.quizService.uploadFile(files['option2'][0], body, 2,timestamp);
    const fileOption3 = await this.quizService.uploadFile(files['option3'][0], body, 3, timestamp);
    const fileOption4 = await this.quizService.uploadFile(files['option4'][0], body, 4, timestamp);

    answers.push(fileOption1.publicUrl);
    answers.push(fileOption2.publicUrl);
    answers.push(fileOption3.publicUrl);
    answers.push(fileOption4.publicUrl);

    return this.quizService.create(body.question, answers, body.imageUrl, body.answer, body.level,
      body.difficult, body.category, body.isEnable, body.explanation, timestamp);
  }
//endregion

  //region test upload
  // @ApiOperation({ summary: "Update my User" })
  // @ApiConsumes("multipart/form-data")
  // @ApiBearerAuth()
  // @UseInterceptors(
  //   FileInterceptor("avatar", {
  //     storage: memoryStorage(
  //     ),
  //     limits: { fileSize: 2097152 }, // 2MB --- 2*2^20
  //     fileFilter: (req, file, callback) => {
  //       return file.mimetype.match(/image\/(jpg|jpeg|png)$/)
  //         ? callback(null, true)
  //         : callback(new BadRequestException("Only image files are allowed"), false);
  //     }
  //   })
  // )

  // @Post("image")
  // async uploadFile(@UploadedFile() image: File): Promise<Question> {
  //   const file = await this.quizService.uploadFile(image);
  //
  //   return file.publicUrl;
  // }
  //endregion


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

