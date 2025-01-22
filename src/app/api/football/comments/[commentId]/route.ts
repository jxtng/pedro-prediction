import { db } from "@/database";
import { comments } from "@/database/schema";
import { currentUser } from "@/lib/current-user";
import logger from "@/utils/logger";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const body = await request.json();

  const { authorId } = body;

  if (!commentId)
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });

  if (!authorId)
    return NextResponse.json({ error: "Author not found" }, { status: 401 });

  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "Please Log in" }, { status: 401 });

  if (user.id !== authorId)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  try {
    await db
      .delete(comments)
      .where(and(eq(comments.id, commentId), eq(comments.authorId, authorId)));
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
