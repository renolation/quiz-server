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
import { MyOption } from "../entity/option.entity";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { LevelEnum } from "./quiz.dto";

export class CreateImageQuizDto {

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  question: string;


  // @IsString()
  // @Type(() => String)
  // @IsNotEmpty()
  // imageUrl:  string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  answer: number;


  @ApiProperty({ enum: LevelEnum})
  @Type(() => String)
  @IsEnum(LevelEnum)
  @IsNotEmpty()
  level: LevelEnum;

  @IsNumber()
  @Type(() => Number)
  @Max(5)
  @Min(1)
  @IsNotEmpty()
  difficult: number;

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
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