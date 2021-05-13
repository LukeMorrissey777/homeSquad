import { Home } from "../entities/Home";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { title } from "process";

@Resolver()
export class HomeResolver {
  @Query(() => [Home])
  homes(@Ctx() { em }: MyContext): Promise<Home[]> {
    return em.find(Home, {});
  }

  @Query(() => Home, { nullable: true })
  home(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Home | null> {
    return em.findOne(Home, { id });
  }

  @Mutation(() => Home)
  async createHome(
    @Arg("name") name: string,
    @Ctx() { em }: MyContext
  ): Promise<Home> {
    const home = em.create(Home, { name });
    await em.persistAndFlush(home);
    return home;
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
    return true;
  }
}
