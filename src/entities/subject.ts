// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
// import { Student } from "./student";
// import { Teacher } from "./teacher";

// @Entity()
// export class Subject {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @ManyToOne(() => Teacher)
//   teacher: Teacher;

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
import { Student } from "./student";
import { Teacher } from "./teacher";

@Entity("Subjects")
@Unique("unique_subject_code", ["Code"])
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "pk_subject",
  })
  Id: number;

  @Column({ type: "varchar", length: 255 })
  Code: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Name: string;

  @Column({ type: "text", nullable: true })
  Description: string;

  @ManyToMany(() => Student, (student) => student.Subjects)
  Students?: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.Subjects)
  Teachers: Teacher[];
}
