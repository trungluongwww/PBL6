import { DataSource } from "typeorm";
import entities from "./entities";

let dataSource: DataSource;

const connect = async (env: NodeJS.ProcessEnv) => {
  dataSource = new DataSource({
    type: "postgres",
    host: env.URI,
    port: Number(env.POSTGRES_PORT),
    username: env.POSTGRES_USER_NAME,
    password: env.POSTGRES_USER_PASSWORD,
    database: env.POSTGRES_DB_NAME,
    // host: "tiny.db.elephantsql.com",
    // port: 5432,
    // username: "zxvzpirj",
    // password: "kUdV85gU-OOzgsGuNtH7Oj4qcRllTjZi",
    // database: "zxvzpirj",
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
  });

  // Connect
  try {
    await dataSource.initialize();
    console.log(`⚡️[postgres]: connected to ${env.URI}`);

    // Set timezone
    await dataSource.manager.query(`SET timezone = '+00:00';`);

    // Run migration
  } catch (err) {
    console.log("err when connected to database postgres", err);
    process.exit(1);
  }
};

const getDataSource = (): DataSource => {
  return dataSource;
};

export default {
  connect,
  getDataSource,
};
