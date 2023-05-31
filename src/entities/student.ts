// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToMany,
//   JoinTable,
// } from "typeorm";
// import { Test } from "./test";
import { StudentTest } from "./student-test";
// import { Subject } from './subject';

// @Entity()
// export class Student {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column("varchar", { length: 255 })
//   name: string;

//   @Column("date")
//   dob: string;

//   @Column("varchar", { length: 255, unique: true })
//   code: string;
// }

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Subject } from "./subject";
import { StudentSubject } from "./student-subject";
import { Test } from "./test";

@Entity("Students")
@Unique("unique_student_code", ["Code"])
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "pk_student",
  })
  Id: number;

  @Column({ type: "varchar", length: 255 })
  Code: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Name: string;

  @CreateDateColumn({
    nullable: true,
    default: () => "timezone('utc'::text, now())",
  })
  Dob: Date;

  @ManyToMany(() => Subject, (temp) => temp.Students)
  @JoinTable({
    name: "StudentSubjects",
    joinColumn: { name: "StudentId", referencedColumnName: "Id" },
    inverseJoinColumn: { name: "SubjectId", referencedColumnName: "Id" },
  })
  Subjects: Subject[];

  @OneToMany(() => StudentSubject, (temp) => temp.Student)
  StudentSubjects: StudentSubject[];

  @ManyToMany(() => Test, (temp) => temp.Students)
  @JoinTable({
    name: "StudentTest",
    joinColumn: { name: "StudentId", referencedColumnName: "Id" },
    inverseJoinColumn: { name: "TestId", referencedColumnName: "Id" },
  })
  Tests: Test[];

  @OneToMany(() => StudentTest, (temp) => temp.Student)
  StudentTest: StudentTest[];
}
