import { Home } from "../entities/Home";
import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  FieldResolver,
  Resolver,
  ResolverInterface,
  Ctx,
  Root,
  Mutation,
  Field,
  ObjectType,
  Arg,
} from "type-graphql";
import { FieldError } from "./user";
import { SuccessResponse } from "./home";
import { GroceryItem } from "../entities/GroceryItem";

@ObjectType()
class GroceryItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => GroceryItem, { nullable: true })
  groceryItem?: GroceryItem;
}

@Resolver(() => GroceryItem)
export class GroceryItemResolver implements ResolverInterface<GroceryItem> {
  @FieldResolver()
  async author(@Root() groceryItem: GroceryItem, @Ctx() { em }: MyContext) {
    const author = await em.findOne(User, { id: groceryItem.authorId });
    return author;
  }
  @FieldResolver()
  async home(@Root() groceryItem: GroceryItem, @Ctx() { em }: MyContext) {
    const home = await em.findOne(Home, { id: groceryItem.homeId });
    return home;
  }

  @Mutation(() => GroceryItemResponse)
  async createGroceryItem(
    @Arg("item") item: string,
    @Arg("homeId") homeId: number,
    @Ctx() { req, em }: MyContext
  ): Promise<GroceryItemResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "username",
            message:
              "You are not logged in so you cannot create a grocery item",
          },
        ],
      };
    }
    if (homeId == -1) {
      return {
        errors: [
          {
            field: "homeId",
            message: "You must sign in to a home to post",
          },
        ],
      };
    }
    if (item == "") {
      return {
        errors: [
          {
            field: "item",
            message: "Grocery Items cannot be empty",
          },
        ],
      };
    }
    const groceryItem = em.create(GroceryItem, {
      homeId,
      authorId: req.session.userId,
      item,
    });
    try {
      await em.persistAndFlush(groceryItem);
    } catch (err) {
      console.log(err);
    }
    return { groceryItem };
  }

  @Mutation(() => SuccessResponse)
  async deleteGroceryItem(
    @Arg("id") id: number,
    @Arg("homeId") homeId: number,
    @Ctx() { req, em }: MyContext
  ): Promise<SuccessResponse> {
    if (!req.session.userId) {
      return {
        success: false,
        errors: [
          {
            field: "username",
            message:
              "You are not logged in so you cannot delete a grocery list",
          },
        ],
      };
    }
    if (homeId == -1) {
      return {
        success: false,
        errors: [
          {
            field: "home",
            message: "You must be signed in to a home to delete a grocery item",
          },
        ],
      };
    }
    const groceryItem = await em.findOne(GroceryItem, { id });
    if (!groceryItem) {
      return {
        success: false,
        errors: [
          {
            field: "id",
            message: "No item with that id exsits",
          },
        ],
      };
    }

    if (groceryItem.authorId != req.session.userId) {
      return {
        success: false,
        errors: [
          {
            field: "Userid",
            message: "You cannot delete a item you didn't create",
          },
        ],
      };
    }

    await em.nativeDelete(GroceryItem, { id });
    return { success: true };
  }

  @Mutation(() => GroceryItem, { nullable: true })
  async updateGroceryItem(
    @Arg("id") id: number,
    @Arg("homeId") homeId: number,
    @Arg("completed", () => Boolean, { nullable: true }) completed: boolean,
    @Ctx() { em }: MyContext
  ): Promise<GroceryItem | null> {
    const groceryItem = await em.findOne(GroceryItem, { id });
    if (homeId == -1) {
      return null;
    }
    if (!groceryItem) {
      return null;
    }
    if (typeof completed !== "undefined") {
      groceryItem.completed = completed;
      await em.persistAndFlush(groceryItem);
    }
    return groceryItem;
  }
}
