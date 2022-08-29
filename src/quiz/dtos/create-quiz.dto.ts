import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MyOption } from "../entity/option.entity";

export class CreateQuizDto {

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(4)
  @ArrayMinSize(2)
  answers: MyOption[];

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  answer: number;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @IsNotEmpty()
  difficult: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @IsNotEmpty()
  isEnable: boolean;

  @IsString()
  @IsNotEmpty()
  explanation: string;

}