import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("date")
  start_work_date: string;

  @Column("varchar", { length: 255, unique: true })
  code: string;
}
