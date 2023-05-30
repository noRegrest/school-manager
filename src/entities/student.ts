import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Test } from "./test";
import { Subject } from "./subject";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("date")
  dob: string;

  @Column("int")
  grade: number;

  @Column("varchar", { length: 255, unique: true })
  code: string;

  // @ManyToMany(() => Test)
  // @JoinTable()
  // stu_sub: Test[];

  @ManyToMany(() => Subject)
  @JoinTable()
  stu_tst: Subject[];
}
