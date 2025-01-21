import "server-only";

import { getVerificationTokenByEmail } from "@/actions/get-tokens";
import { db } from "@/database";
import { verificationTokens } from "@/database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Add 1 hour

    // Fetch the existing token associated with the email
    const existingToken = await getVerificationTokenByEmail(email);

    // Delete the existing token if it exists
    if (existingToken) {
      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.token, existingToken.token));
    }

    // Insert a new verification token
    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    });

    return { identifier: email, token, expires };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Add 1 hour

    // Fetch the existing token associated with the email
    const existingToken = await getVerificationTokenByEmail(email);

    // Delete the existing token if it exists
    if (existingToken) {
      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.token, existingToken.token));
    }

    // Insert a new verification token
    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    });

    return { identifier: email, token, expires };
  } catch (error) {
    console.log(error);
    return null;
  }
};
