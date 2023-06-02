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
