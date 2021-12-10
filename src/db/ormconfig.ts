import { getConnectionManager, ConnectionManager, Connection } from "typeorm";


const connectionManager = getConnectionManager();
const connection = connectionManager.create({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  
});
const conManager = async () => {
  try {
    await connection.connect();
    console.log('connection created')
  } catch (error) {
    console.log("error", error);
  }
}

export default conManager;
