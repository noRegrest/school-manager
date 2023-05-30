import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Student } from "./student";
import { Test } from "./test";

@Entity()
@Unique(["student", "test"])
export class StudentTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  grade: number;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Test)
  test: Test;
}
