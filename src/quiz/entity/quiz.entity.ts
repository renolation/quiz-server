import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';
import { MyOption } from './option.entity';

@Entity()

export class Question {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    // @Column("int", { array: true })
    // answers: string[]

    // @Column('simple-array', { nullable: true , array: true},)
    // answers: string[];

    @Column({
        type: 'jsonb',
        nullable: true,
      })
      answers: MyOption[];

    // @Column()
    // answers: string;

    @Column()
    imageUrl: string;

    @Column()
    answer: number;

    @Column()
    level: string;

    @Column()
    difficult: number;

    @Column()
    category: string;

    @Column()
    isEnable: boolean;

    @Column()
    explaination: string;

    @Column()
    timestamp: number;

}