import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FontStyleEnum, FontWeightEnum } from "../../core/enums/style_text.enum";


@Entity()
export class StyleText{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fontFamily: string;

  @Column()
  height: number;


    @Column()
    color: string;

  @Column()
  backgroundColor: string;

  @Column()
  fontSize: number;

  @Column({
    type: 'enum',
    enum: FontWeightEnum,
    default: FontWeightEnum.w600
  })
  fontWeight: FontWeightEnum;

  @Column({
    type: 'enum',
    enum: FontStyleEnum,
    default: FontStyleEnum.normal
  })
  fontStyle: FontStyleEnum;

  @Column()
  letterSpacing: number;

  @Column()
  wordSpacing: number;

}

// @JsonKey(name: 'font_family') required String fontFamily,
// @JsonKey(name: 'height') double? height,
// @JsonKey(name: 'color') String? color,
// @JsonKey(name: 'background_color') String? backgroundColor,
// @JsonKey(name: 'font_size') double? fontSize,
// @JsonKey(name: 'font_weight') FontWeightEnum? fontWeight, //enum
// @JsonKey(name: 'font_style') FontStyleEnum? fontStyle,   //enum
// @JsonKey(name: 'letter_spacing') double? letterSpacing,
// @JsonKey(name: 'word_spacing') double? wordSpacing,

