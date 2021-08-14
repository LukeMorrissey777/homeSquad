import { Migration } from "@mikro-orm/migrations";

export class Migration20210530235917 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "home_user_link" ("user_id" int4 not null, "home_id" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    );
    this.addSql(
      'alter table "home_user_link" add constraint "home_user_link_pkey" primary key ("user_id", "home_id");'
    );
    this.addSql(
      'create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null);'
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");'
    );
    this.addSql(
      'create table "home" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "owner_id" int4 not null, "name" varchar(255) not null);'
    );
    this.addSql(
      'alter table "home" add constraint "home_name_unique" unique ("name");'
    );
  }
}
