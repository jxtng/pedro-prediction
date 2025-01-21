"use server";

import { db } from "@/database";
import { users, verificationTokens } from "@/database/schema";
import { getVerificationTokenByToken } from "./get-tokens";
import { getUserByEmail } from "./users";
import { eq } from "drizzle-orm";
import logger from "@/utils/logger";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.identifier);

    if (!existingUser) {
      return { error: "User not found!" };
    }

    // Update user's emailVerified field
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));

    // Delete the verification token
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, existingToken.token));

    return { success: "Email verified!" };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};
