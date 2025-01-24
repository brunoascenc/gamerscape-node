import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "postgres",
  entities: ["src/database/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  synchronize: false,
  logging: false,
});

export default AppDataSource;

AppDataSource.initialize()
  .then(() => console.log("Db initialized"))
  .catch((error) => console.log(error));
