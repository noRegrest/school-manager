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
import { Subject } from "./subject";

@Entity("StudentSubjects")
export class StudentSubject extends BaseEntity {
	@PrimaryGeneratedColumn({ name: "StudentId" })
	@ManyToOne((_) => Student, { nullable: false })
	@JoinColumn({ name: "StudentId" })
	Student: Student;

	@PrimaryGeneratedColumn({ name: "SubjectId" })
	@ManyToOne((_) => Subject, { nullable: false })
	@JoinColumn({ name: "SubjectId" })
	Subject: Subject;

	@Column({ type: "text", nullable: true })
	Description: string;
}
