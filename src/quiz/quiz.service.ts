import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { MyOption } from './entity/option.entity';


@Injectable()
export class QuizService {
    constructor(@InjectRepository(Question) private repo: Repository<Question>) { }

    async create(question: string, answers: MyOption[], imageUrl: string, answer: number,level: string, difficult: number, category: string, isEnable: boolean, explanation: string, timestamp: number){
        const myQuestion = this.repo.create({question, answers, imageUrl, answer,level, difficult, category, isEnable, explanation: explanation, timestamp});
        await this.repo.save(myQuestion);
        return JSON.stringify(myQuestion);
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
}
