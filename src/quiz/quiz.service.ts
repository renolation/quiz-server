import { Injectable } from '@nestjs/common';
import { Question } from './entity/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';


@Injectable()
export class QuizService {
    constructor(@InjectRepository(Question) private repo: Repository<Question>) { }


    async create(question: string, answers: string[], imageUrl: string, answer: number,level: string, difficult: number, category: string, isEnable: boolean, explaination: string, timestamp: number){
        const myquestion = this.repo.create({question, answers, imageUrl, answer,level, difficult, category, isEnable, explaination, timestamp});
        this.repo.save(myquestion);
        return JSON.stringify(myquestion);
    }

}
