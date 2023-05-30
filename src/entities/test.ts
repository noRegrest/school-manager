import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Teacher } from "./teacher";

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Teacher)
  teacher: Teacher[];

  @Column("varchar", { length: 255, unique: true })
  code: string;
}
