import { Home } from "../entities/Home";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { title } from "process";
import { HomeUserLink } from "../entities/HomeUserLink";
import { FieldError } from "./user";
import { User } from "../entities/User";

@ObjectType()
class HomeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Home, { nullable: true })
  home?: Home;
}

@Resolver((of) => Home)
export class HomeResolver implements ResolverInterface<Home> {
  @FieldResolver()
  async owner(@Root() home: Home, @Ctx() { em }: MyContext) {
    const owner = await em.findOne(User, { id: home.ownerId });
    return owner;
  }

  @FieldResolver()
  async users(@Root() home: Home, @Ctx() { em }: MyContext) {
    const links = await em.find(HomeUserLink, { homeId: home.id });
    if (links.length == 0) {
      return null;
    }

    var userIds = [];
    for (var i = 0; i < links.length; i++) {
      userIds.push(links[i].userId);
    }
    const users = await em.find(User, userIds);
    return users;
  }

  @Query(() => [Home])
  homes(@Ctx() { em }: MyContext): Promise<Home[]> {
    return em.find(Home, {});
  }

  @Query(() => Home, { nullable: true })
  home(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Home | null> {
    return em.findOne(Home, { id });
  }

  @Mutation(() => HomeResponse)
  async createHome(
    @Arg("name") name: string,
    @Ctx() { req, em }: MyContext
  ): Promise<HomeResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "username",
            message: "You are not logged in so you cannot create a room",
          },
        ],
      };
    }
    const home = em.create(Home, { name, ownerId: req.session.userId });
    await em.persistAndFlush(home);
    const link = em.create(HomeUserLink, {
      userId: req.session.userId,
      homeId: home.id,
    });
    await em.persistAndFlush(link);
    return { home };
  }

  @Mutation(() => Home, { nullable: true })
  async updateHome(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Ctx() { em }: MyContext
  ): Promise<Home | null> {
    const home = await em.findOne(Home, { id });
    if (!home) {
      return null;
    }
    if (typeof title !== "undefined") {
      home.name = name;
      await em.persistAndFlush(home);
    }
    return home;
  }

  @Mutation(() => Boolean)
  async deleteHome(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Home, { id });
    await em.nativeDelete(HomeUserLink, { homeId: id });
    return true;
  }
}
