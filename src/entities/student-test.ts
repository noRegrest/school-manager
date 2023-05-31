// import {
//   BaseEntity,
//   Check,
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   Unique,
//   ValueTransformer,
// } from "typeorm";
// import { Student } from "./student";
// import { Test } from "./test";

// @Entity()
// @Unique(["student", "test"])
// export class StudentTest {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     nullable: true,
//     type: "decimal",
//     precision: 4,
//     scale: 2,
//   })
//   @Check(`grade >= 0 AND grade <= 10`)
//   grade: number;

//   @ManyToOne(() => Student)
//   student: Student;

//   @ManyToOne(() => Test)
//   test: Test;
// }

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Student } from "./student";
import { Test } from "./test";

@Entity("StudentTest")
export class StudentTest extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "StudentId" })
  @ManyToOne((_) => Student, { nullable: false })
  @JoinColumn({ name: "StudentId" })
  Student: Student;

  @PrimaryGeneratedColumn({ name: "TestId" })
  @ManyToOne((_) => Test, { nullable: false })
  @JoinColumn({ name: "TestId" })
  Test: Test;

  @Column({ type: "integer", nullable: true })
  Score: number;
}
