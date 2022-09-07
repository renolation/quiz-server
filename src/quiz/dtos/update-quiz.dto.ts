import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { MyOption } from "../entity/option.entity";

export class UpdateQuizDto {
  @IsString()
  @IsOptional()
  question: string;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(4)
  @ArrayMinSize(2)
  answers: string[];

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsNumber()
  @IsOptional()
  answer: number;

  @IsString()
  @IsOptional()
  level: string;

  @IsNumber()
  @IsOptional()
  difficult: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsBoolean()
  @IsOptional()
  isEnable: boolean;

  @IsString()
  @IsOptional()
  explanation: string;

  @IsNumber()
  @IsOptional()
  timestamp: number;
}