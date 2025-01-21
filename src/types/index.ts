import type { User } from "next-auth";
import type { NewPasswordSchema } from "@/schemas";
import type z from "zod";

export interface ExtendedSessionUser extends User {
  role: string;
}

export type NewPasswordValues = z.infer<typeof NewPasswordSchema>;

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: {
    start: string;
    until: string;
  };
}

export interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}
