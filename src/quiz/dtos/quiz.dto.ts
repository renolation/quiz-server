import {Expose} from 'class-transformer';
import { MyOption } from "../entity/option.entity";

export class QuizDto {

  @Expose()
  id: number;

  @Expose()
  answers?: MyOption[];

  @Expose()
  imageUrl: string;

  @Expose()
  answer: number;

  @Expose()
  level: string;

  @Expose()
  difficult: number;

  @Expose()
  category: string;

  @Expose()
  isEnable: boolean;

  @Expose()
  explanation: string;

  @Expose()
  timestamp: number;
}


export enum LevelEnum {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}
