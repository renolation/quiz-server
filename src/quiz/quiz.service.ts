import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { MyOption } from './entity/option.entity';
import { UpdateQuizDto } from "./dtos/update-quiz.dto";
import { CloudStorageService } from "../core/services/cloud-storage.service";
import { File } from "../core/interfaces/file.interface";
import { parse } from "path";
import { CreateImageQuizDto } from "./dtos/create-image-quiz.dto";


@Injectable()
export class QuizService {
    constructor(
      @InjectRepository(Question) private repo: Repository<Question>,
      private cloudStorageService: CloudStorageService
      ) { }

    async create(question: string, answers: MyOption[], imageUrl: string, answer: number,level: string, difficult: number, category: string, isEnable: boolean, explanation: string, timestamp: number){
        const myQuestion = this.repo.create({question, answers, imageUrl, answer,level, difficult, category, isEnable, explanation: explanation, timestamp});
        // await this.repo.save(myQuestion);
        console.log(myQuestion);
        return myQuestion;
    }

    private setFilename(uploadedFile: File, body: CreateImageQuizDto, index: number, timestamp: number): string {
        const fileName = parse(uploadedFile.originalname);
        return `${body.category}_${body.level}_Difficult-${body.difficult}_Option-${index}_${timestamp}${fileName.ext}`;
        // return `${fileName.name}-${Date.now()}${fileName.ext}`.replace(/^\.+/g, '').replace(/^\/+/g, '').replace(/\r|\n/g, '_');
    }

    async uploadFile(image: File, body: CreateImageQuizDto, index: number, timestamp: number){
        image.filename = this.setFilename(image, body, index, timestamp);
        console.log(image);
        const file = await this.cloudStorageService.uploadFile(image, '/quiz/image/');
        // // const url = file.publicUrl;
        // // const name = file.name;
        return file;
    }

    async findOne(id: number) {
        const question = await this.repo.findOneBy({ id: id });
        if (!question) {
            throw new NotFoundException('Template not found');
        }
        console.log(question);
        return question;
    }

    async findAll()  {
       const items = await this.repo.find({});
        return JSON.stringify(items);
    }

    async update(id: number, attrs: Partial<Question>) {
        const question = await this.findOne(id);
        if(!question){
            throw new NotFoundException('Question not found');
        }
        Object.assign(question, attrs);
        await this.repo.save(question);
        return JSON.stringify(question);
    }

    async remove(id: number) {
        const question = await this.findOne(id);
        if(!question){
            throw new NotFoundException('Question not found');
        }
        return this.repo.remove(question);
    }
}
