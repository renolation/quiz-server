import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail, IsEnum,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsString, Max, Min
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MyOption } from "../entity/option.entity";
import { LevelEnum } from "./quiz.dto";

export class CreateQuizDto {

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMaxSize(4)
  @ArrayMinSize(2)
  answers: MyOption[];

  // @IsString()
  // @IsNotEmpty()
  // imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  answer: number;

  @ApiProperty({ enum: LevelEnum})
  @Type(() => String)
  @IsEnum(LevelEnum)
  @IsNotEmpty()
  level: LevelEnum;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Max(5)
  @Min(1)
  difficult: number;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  category: string;


  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isEnable: boolean = true;

  @IsString()
  @IsOptional()
  @Type(() => String)
  explanation: string = '';

}