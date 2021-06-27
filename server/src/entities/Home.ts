import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { GroceryItem } from "./GroceryItem";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Home {
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
  ownerId!: number;

  @Field(() => User, { nullable: true })
  owner!: User | null;

  @Field(() => [User], { nullable: true })
  users: User[] | null;

  @Field(() => [Post], { nullable: true })
  posts: Post[] | null;

  @Field(() => [GroceryItem], { nullable: true })
  groceryItems: GroceryItem[] | null;

  @Field()
  @Property({ unique: true })
  name!: string;
}
