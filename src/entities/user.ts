import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("Users")
@Unique("Unique_Users_UserName", ["UserName"])
@Unique("Unique_Users_Email", ["Email"])
export default class Users {
	@PrimaryGeneratedColumn("increment", {
		primaryKeyConstraintName: "pk_test",
	})
	Id: number;

	@Column({ type: "varchar", length: 255 })
	UserName: string;

	@Column({ type: "text" })
	Password: string;

	@Column({ type: "varchar", length: 255, nullable: true })
	Email?: string;

	@Column({ type: "bool", nullable: true })
	IsAdmin: boolean = false;
}
