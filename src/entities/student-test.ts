import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student";
import { Test } from "./test";

@Entity()
export class StudentTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Test)
  test: Test;
}
