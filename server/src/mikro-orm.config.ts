import { __prod__ } from "./constants";
import { Home } from "./entities/Home";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import "dotenv-safe/config";
import { User } from "./entities/User";
import { HomeUserLink } from "./entities/HomeUserLink";
import { GroceryItem } from "./entities/GroceryItem";
import { Post } from "./entities/Post";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[jt]s$/,
  },
  entities: [Home, User, HomeUserLink, Post, GroceryItem],
  type: "postgresql",
  clientUrl: process.env.DATABASE_URL,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
