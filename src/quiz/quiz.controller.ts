import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query, UploadedFile,
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
import { LevelEnum } from "./dtos/quiz.dto";

@Controller("quiz")
export class QuizController {


  constructor(
    private quizService: QuizService
  ) {
  }

  @Post("/create")
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: CreateQuizDto, @UploadedFile() file: Express.Multer.File) {
    let imageUrl = '';
    console.log(body);
    const timestamp = Math.floor(Date.now() / 1000);
    // const imageUrl = await this.quizService.uploadFile(file, body, 1, timestamp);
    if(file != null){
      file.filename =  this.quizService.setImageFileName(file, body, timestamp);
      imageUrl = await this.quizService.uploadFile(file, body.category);
    }
    return this.quizService.create(body.question, body.answers, imageUrl, body.answer, body.level,
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
      { name: "option4", maxCount: 1 },
      { name: "imageFile", maxCount: 1 }
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
    option4?: Express.Multer.File[],
    imageFile?: Express.Multer.File[],
  }) {
    const timestamp = Math.floor(Date.now() / 1000);

    let answers = [];
    let imageUrl = '';
    if(files["option1"] != null){
      let file1 : File = files["option1"][0];
      file1.filename = this.quizService.setFilename(file1, body, 1, timestamp);
      const fileOption1 = await this.quizService.uploadFile(file1, body.category);
      answers.push(fileOption1.publicUrl);
    }
    if(files["option2"] != null){
      let file2 : File = files["option2"][0];
      file2.filename = this.quizService.setFilename(file2, body, 2, timestamp);
      const fileOption2 = await this.quizService.uploadFile(file2, body.category);
      answers.push(fileOption2.publicUrl);
    }
    if(files["option3"] != null){
      let file3 : File = files["option3"][0];
      file3.filename = this.quizService.setFilename(file3, body, 3, timestamp);
      const fileOption3 = await this.quizService.uploadFile(file3, body.category);
      answers.push(fileOption3.publicUrl);
    }
    if(files["option4"] != null){
      let file4 : File = files["option4"][0];
      file4.filename = this.quizService.setFilename(file4, body, 4, timestamp);
      const fileOption4 = await this.quizService.uploadFile(file4, body.category);
      answers.push(fileOption4.publicUrl);
    }
    if(files["imageFile"] != null){
      let imageFile : File = files["imageFile"][0];
      imageFile.filename = this.quizService.setImageFileName(imageFile, body, timestamp);
      const image = await this.quizService.uploadFile(imageFile, body.category);
      imageUrl = image.publicUrl;
    }


    // console.log(answers);
    // return answers;

    return this.quizService.create(body.question, answers, imageUrl, body.answer, body.level,
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

  @Get("/category/:category")
  getQuizByCategory(@Param("category") category: string) {
    return this.quizService.findQuizByCategory(category);
  }

  @Get("/level/:level")
  getQuizByLevel(@Param("level") level: LevelEnum) {
    return this.quizService.findQuizByLevel(level);
  }


}

