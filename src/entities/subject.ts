import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./student";
import { Teacher } from "./teacher";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  teacher: Teacher;

  @Column("varchar", { length: 255, unique: true })
  code: string;
}
