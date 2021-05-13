import { __prod__ } from "./constants";
import { Home } from "./entities/Home";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[jt]s$/,
  },
  entities: [Home, User],
  dbName: "homesquad_db",
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
