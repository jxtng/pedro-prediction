import "server-only";

import { db } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (!user) return null;
  return user[0];
};

export const getUserById = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  if (!user) return null;
  return user[0];
};
