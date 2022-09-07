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

    //region old
    // @Column("int", { array: true })
    // answers: string[]

    // @Column('simple-array', { nullable: true , array: true},)
    // answers: string[];

    // @Column({
    //     type: 'json',
    //     nullable: true,
    //   })
    //   answers: MyOption[];

    //endregion

    @Column('jsonb', {nullable: true})
    answers?: string[];

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
    explanation: string;

    @Column()
    timestamp: number;

}