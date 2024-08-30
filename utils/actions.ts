"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "./prisma";

export const handleSignIn = async () => {
  await signIn("github");
};

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user) {
  
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });
  return user;
}