import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { MyOption } from './entity/option.entity';


@Injectable()
export class QuizService {
    constructor(@InjectRepository(Question) private repo: Repository<Question>) { }


    async create(question: string, answers: MyOption[], imageUrl: string, answer: number,level: string, difficult: number, category: string, isEnable: boolean, explaination: string, timestamp: number){
        const myquestion = this.repo.create({question, answers, imageUrl, answer,level, difficult, category, isEnable, explaination, timestamp});
        this.repo.save(myquestion);
        return JSON.stringify(myquestion);
    }

    async findOne(id: number) {
        const question = await this.repo.findOneBy({ id: id });
        if (!question) {
            throw new NotFoundException('Template not found');
        }
        console.log(question);
        return question;
    }

}
