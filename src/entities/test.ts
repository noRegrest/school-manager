import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Student } from "./student";
import { Teacher } from "./teacher";

@Entity("Test")
@Unique("unique_test_code", ["Code"])
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "pk_test",
  })
  Id: number;

  @Column({ type: "varchar", length: 255 })
  Code: string;

  @Column({ type: "text", nullable: true })
  Description: string;

  @ManyToMany(() => Student, (student) => student.Tests)
  Students?: Student[];

  @ManyToOne(() => Teacher, (teacher) => teacher.Tests)
  Teachers: Teacher;
}
