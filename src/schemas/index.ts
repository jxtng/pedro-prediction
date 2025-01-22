import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    name: z.string().min(1, {
      message: "Name is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Helper function to convert word numbers to digits
const wordToDigitMap = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const convertWordsToDigits = (text: string) => {
  // Convert text to lowercase for matching
  let processed = text.toLowerCase();

  // Replace all number words with their digit equivalents
  Object.entries(wordToDigitMap).forEach(([word, digit]) => {
    // Use word boundary to match whole words only
    const regex = new RegExp(`\\b${word}\\b`, "g");
    processed = processed.replace(regex, digit);
  });

  return processed;
};

export const CommentSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Comment is required",
    })
    .max(200, {
      message: "Comment must be less than 200 characters",
    })
    // Block standard and obfuscated phone numbers
    .refine(
      (content) => {
        // Convert any number words to digits first
        const processedContent = convertWordsToDigits(content);

        const phonePattern =
          /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}|\b\d{10,11}\b/;

        // Normalize content by removing all spaces, punctuation, and non-numeric characters
        const stripped = processedContent.replace(/[\s\W]/g, "");

        // Detect obfuscated numbers with separators like "0 8 0-5-7 7 0 7 3 2 7"
        const obfuscatedPattern = /(?:\d[\s.,_-]*){8,}/;

        return (
          !phonePattern.test(content) && // No standard phone numbers
          !obfuscatedPattern.test(content) && // No obfuscated phone numbers
          !/\d{8,}/.test(stripped) // No long numeric sequences
        );
      },
      {
        message: "Phone numbers are not allowed in comments",
      }
    )
    // Block URLs
    .refine(
      (content) => {
        const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/i;
        return !urlPattern.test(content);
      },
      {
        message: "Links are not allowed in comments",
      }
    ),
  matchId: z.number(),
  authorId: z.string(),
  parentId: z.string().optional(),
});
