// import { Pool, Client } from "pg";
// import * as ct from "../constants";
// import { DataSource } from "typeorm";

// const pool: Pool = new Pool({
//   port: ct.PostgresPort,
//   host: ct.PostgresHost,
//   user: ct.PostgresUser,
//   password: ct.PostgresPassword,
//   database: ct.PostgresDatabase,
// });

// export default pool;

import { DataSource } from "typeorm";
import { Postgres } from "../constants";
import { Teacher } from "./entities/teacher";
import { Test } from "./entities/test";
import { Student } from "./entities/student";
import { Subject } from "./entities/subject";
import { StudentTest } from "./entities/student-test";
import { StudentSubject } from "./entities/student-subject";

const postgresConfig = {
  host: Postgres.Host,
  // port: Postgres.Port,
  username: Postgres.User,
  password: Postgres.Password,
  database: Postgres.Database,
  schema: Postgres.Schema,
};

const AppDataSource = new DataSource({
  ...postgresConfig,
  type: "postgres",
  synchronize: true, //constants.IsProd ? false : true,
  logging: true, // constants.IsProd ? false : true,
  migrations: ["../migration"],
  entities: [Teacher, Subject, Student, StudentSubject, Test, StudentTest],
});

export default AppDataSource;
