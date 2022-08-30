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
import { MyOption } from "../entity/option.entity";
import { Type } from "class-transformer";

export class CreateImageQuizDto {

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  question: string;


  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  answer: number;

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  level: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  difficult: number;

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  @Type(() => Boolean)
  @IsNotEmpty()
  isEnable: boolean;

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  explanation: string;

}