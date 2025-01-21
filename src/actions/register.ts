"use server";

import { db } from "@/database";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/actions/users";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import * as z from "zod";
import { users } from "@/database/schema";

type RegisterValues = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterValues) => {
  console.log("start register");

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.insert(users).values({
    name,
    password: hashedPassword,
    email,
  });

  const verificationToken = await generateVerificationToken(email);
  if (!verificationToken)
    return {
      error:
        "Your account has been created , but we were unable to send the verification email to verify your account. Please try logging in to generate a new verification email",
    };
  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token
  );
  return { success: "Confirmation email sent!" };
};
