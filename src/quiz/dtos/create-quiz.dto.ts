import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail, IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString, Max, Min
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MyOption } from "../entity/option.entity";
import { LevelEnum } from "./quiz.dto";

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
  // @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  answer: number;

  @ApiProperty({ enum: LevelEnum})
  @Type(() => String)
  @IsEnum(LevelEnum)
  @IsNotEmpty()
  level: LevelEnum;

  @IsNumber()
  @IsNotEmpty()
  @Max(5)
  @Min(1)
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