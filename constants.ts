import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
	// validate undefined
	process.exit(1);
}

export const PORT: number = parseInt(process.env.Port!);
export const PostgresPort: number = parseInt(process.env.POSTGRES_PORT!);
export const PostgresHost: string = process.env.POSTGRES_HOST!;
export const PostgresDatabase: string = process.env.POSTGRES_DATABASE!;
export const PostgresUser: string = process.env.POSTGRES_USER!;
export const PostgresPassword: string = process.env.POSTGRES_PASSWORD!;
export const PostgresSchema: string = process.env.POSTGRES_SCHEMA!;

export const ResMessageCommon = {
	somethingWentWrong: "Something went wrong.",
	success: "Success.",
	duplicate: "Already exist.",
	failed: "Failed.",
	noneExist: "Code not found.",
};

export const Postgres = {
	Port: parseInt(process.env.POSTGRES_PORT!),
	Host: process.env.POSTGRES_HOST!,
	Database: process.env.POSTGRES_DATABASE!,
	User: process.env.POSTGRES_USER!,
	Password: process.env.POSTGRES_PASSWORD!,
	Schema: process.env.POSTGRES_SCHEMA!,
};
