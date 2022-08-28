import {
    Entity,
    Column
} from 'typeorm';

@Entity()
export class Option {
    @Column()
    option: string;
}