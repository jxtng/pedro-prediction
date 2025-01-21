import "server-only";

import { db } from "@/database";
import { passwordReseTokens, verificationTokens } from "@/database/schema";
import { eq } from "drizzle-orm";
import "server-only";

export const getVerificationTokenByEmail = async (email: string) => {
  const token = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.identifier, email))
    .limit(1);
  return token[0];
};

export const getVerificationTokenByToken = async (token: string) => {
  const verificationToken = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .limit(1);
  return verificationToken[0];
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  const token = await db
    .select()
    .from(passwordReseTokens)
    .where(eq(passwordReseTokens.identifier, email))
    .limit(1);
  return token[0];
};

export const getPasswordResetTokenByToken = async (token: string) => {
  const passwordReseToken = await db
    .select()
    .from(passwordReseTokens)
    .where(eq(passwordReseTokens.token, token))
    .limit(1);
  return passwordReseToken[0];
};
