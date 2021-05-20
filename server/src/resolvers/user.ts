import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { Home } from "../entities/Home";
import { HomeUserLink } from "../entities/HomeUserLink";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver((of) => User)
export class UserResolver implements ResolverInterface<User> {
  @FieldResolver()
  async homes(@Root() user: User, @Ctx() { em }: MyContext) {
    const links = await em.find(HomeUserLink, { userId: user.id });

    if (links.length === 0) {
      return null;
    }

    var homeIds = [];
    for (var i = 0; i < links.length; i++) {
      homeIds.push(links[i].homeId);
    }

    const homes = await em.find(Home, homeIds);
    return homes;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Query(() => [Home], { nullable: true })
  myhomes(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const homeIds = em.find(HomeUserLink, { userId: req.session.userId });
    console.log(homeIds);
    return null;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 3) {
      return {
        errors: [
          {
            field: "username",
            message: "Username is not long enough",
          },
        ],
      };
    }
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is not long enough",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "A user with that username already exsists",
            },
          ],
        };
      }
      console.log("message: ", err);
    }
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "No User with that username.",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }
}
