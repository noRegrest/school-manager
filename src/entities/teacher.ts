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

	@OneToMany(() => Test, (test) => test.Teachers)
	Tests: Test[];

	@CreateDateColumn({
		nullable: true,
		default: () => "timezone('utc'::text, now())",
	})
	WorkStartDate: Date;

	@ManyToOne(() => Subject, (subject) => subject.Teachers)
	Subjects: Subject;
}
