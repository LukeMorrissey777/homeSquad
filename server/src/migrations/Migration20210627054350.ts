import { Migration } from "@mikro-orm/migrations";

export class Migration20210627054350 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "grocery_item" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" int4 not null, "home_id" int4 not null, "item" varchar(255) not null, "completed" bool not null);'
    );
    this.addSql(
      'create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" int4 not null, "home_id" int4 not null, "text" varchar(255) not null);'
    );
  }
}
