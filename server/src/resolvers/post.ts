import { Home } from "../entities/Home";
import { Post } from "../entities/Post";
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

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(() => Post)
export class PostResolver implements ResolverInterface<Post> {
  @FieldResolver()
  async author(@Root() post: Post, @Ctx() { em }: MyContext) {
    const author = await em.findOne(User, { id: post.authorId });
    return author;
  }
  @FieldResolver()
  async home(@Root() post: Post, @Ctx() { em }: MyContext) {
    const home = await em.findOne(Home, { id: post.homeId });
    return home;
  }

  @Mutation(() => PostResponse)
  async createPost(
    @Arg("text") text: string,
    @Arg("homeId") homeId: number,
    @Ctx() { req, em }: MyContext
  ): Promise<PostResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "username",
            message: "You are not logged in so you cannot post",
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
    if (text == "") {
      return {
        errors: [
          {
            field: "text",
            message: "Posts cannot be empty",
          },
        ],
      };
    }
    const post = em.create(Post, {
      homeId,
      text,
      authorId: req.session.userId,
    });
    try {
      await em.persistAndFlush(post);
    } catch (err) {
      console.log(err);
    }
    return { post };
  }

  @Mutation(() => SuccessResponse)
  async deletePost(
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
            message: "You are not logged in so you cannot delete a post",
          },
        ],
      };
    }
    if (homeId == -1) {
      return {
        success: false,
        errors: [
          {
            field: "Home",
            message: "You must be signed in to a home to delete a post",
          },
        ],
      };
    }
    const post = await em.findOne(Post, { id });
    if (!post) {
      return {
        success: false,
        errors: [
          {
            field: "id",
            message: "No post with that id exsits",
          },
        ],
      };
    }

    if (post.authorId != req.session.userId) {
      return {
        success: false,
        errors: [
          {
            field: "Userid",
            message: "You cannot delete a post you are not the author of",
          },
        ],
      };
    }

    await em.nativeDelete(Post, { id });
    return { success: true };
  }
}
