import { db } from "@/database";
import { eq, sql } from "drizzle-orm";
import { comments, commentLikes, users } from "@/database/schema";
import { NextResponse } from "next/server";
import logger from "@/utils/logger";
import { CommentSchema } from "@/schemas";
import { ZodError } from "zod";
import { currentUser } from "@/lib/current-user";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");

    if (!matchId) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      );
    }

    // Get comments with likes count, replies count, and author information
    const matchComments = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        postId: comments.matchId,
        parentId: comments.parentId,
        likesCount: sql<number>`count(distinct ${commentLikes.userId})`,
        repliesCount: sql<number>`(
          SELECT count(*)
          FROM ${comments} as replies
          WHERE replies.parent_id = ${comments.id}
        )`,
        author: {
          id: users.id,
          name: users.name,
          image: users.image,
          email: users.email,
          role: users.role,
        },
      })
      .from(comments)
      .leftJoin(commentLikes, eq(commentLikes.commentId, comments.id))
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.matchId, Number(matchId)))
      .groupBy(
        comments.id,
        users.id,
        users.name,
        users.image,
        users.email,
        users.role
      );
    logger.log({ level: "info", message: matchComments });
    return NextResponse.json(matchComments);
  } catch (error) {
    logger.log({ level: "error", message: error });
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body against schema
    const validatedData = CommentSchema.parse(body);
    const user = await currentUser();

    if (user?.id !== validatedData.authorId) {
      return NextResponse.json(
        { error: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }
    // Create new comment
    const newComment = await db
      .insert(comments)
      .values({
        content: validatedData.content,
        authorId: validatedData.authorId,
        matchId: validatedData.matchId,
      })
      .returning({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        authorId: comments.authorId,
        matchId: comments.matchId,
        parentId: comments.parentId,
      });

    // Get the full comment data with author information
    const [commentWithAuthor] = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        postId: comments.matchId,
        parentId: comments.parentId,
        likesCount: sql<number>`count(distinct ${commentLikes.userId})`,
        repliesCount: sql<number>`(
          SELECT count(*)
          FROM ${comments} as replies
          WHERE replies.parent_id = ${comments.id}
        )`,
        author: {
          id: users.id,
          name: users.name,
          image: users.image,
          email: users.email,
          role: users.role,
        },
      })
      .from(comments)
      .leftJoin(commentLikes, eq(commentLikes.commentId, comments.id))
      .innerJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.id, newComment[0].id))
      .groupBy(
        comments.id,
        users.id,
        users.name,
        users.image,
        users.email,
        users.role
      );

    logger.log({
      level: "info",
      message: "Comment created successfully",
      comment: commentWithAuthor,
    });

    return NextResponse.json(commentWithAuthor);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.log({
        level: "error",
        message: "Validation error",
        error: error.errors,
      });
      return NextResponse.json(
        { error: "Invalid comment data", details: error.errors },
        { status: 400 }
      );
    }

    logger.log({
      level: "error",
      message: "Failed to create comment",
      error,
    });

    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
