import { Column, Entity, PrimaryGeneratedColumn, OneToOne , JoinColumn} from "typeorm";
import { StyleText } from "./style_text.entity";

@Entity()
export class Quote{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  @Column()
  like: number;

  @Column()
  download: number;

  @Column()
  category: string;

  // @Column()
  // styleText: StyleTextInterface;

  @OneToOne(() => StyleText)
  @JoinColumn()
  styleText: StyleText

  @Column()
  isVerify: boolean;

}

// numberint? id,
//   String? text,
//   String? imageUrl,
//   String? name,
//   String? author,
//   String? createdAt,
//   int? like,
//   int? download,
//   String? category,
//   StyleText? styleText,
// @JsonKey(name: 'is_verify') @Default(false) bool isVerify,