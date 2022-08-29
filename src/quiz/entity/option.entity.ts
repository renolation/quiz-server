import {
    Entity,
    Column
} from 'typeorm';

// @Entity()
// export class Option {
//     @Column()
//     option: string;
// }

export interface MyOption {
    text: string;
    imageUrl: string;
  }