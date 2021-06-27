import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Home } from "./Home";
import { User } from "./User";

@ObjectType()
@Entity()
export class GroceryItem {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  authorId!: number;

  @Field(() => User, { nullable: true })
  author!: User | null;

  @Property()
  homeId!: number;

  @Field(() => Home, { nullable: true })
  home!: Home | null;

  @Field()
  @Property()
  item!: string;

  @Field()
  @Property()
  completed: boolean = false;
}
