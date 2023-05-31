// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// export class Teacher {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column("varchar", { length: 255 })
//   name: string;

//   @Column("date")
//   start_work_date: Date;

//   @Column("varchar", { length: 255, unique: true })
//   code: string;
// }

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Subject } from "./subject";
import { Test } from "./test";

@Entity("Teachers")
@Unique("unique_teacher_code", ["Code"])
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "pk_teacher",
  })
  Id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  Code: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Name: string;

  @Column({ type: "text", nullable: true })
  Description: string;

  @OneToMany(() => Test, (test) => test.Teachers)
  Tests: Test[];

  @ManyToOne(() => Subject, (subject) => subject.Teachers)
  Subjects: Subject[];
}
