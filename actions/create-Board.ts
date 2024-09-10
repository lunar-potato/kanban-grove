"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const createBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum of three (3) characters",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = createBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch(error) {
    return {
      message: "Database Error",
    };
  }

  revalidatePath("/organization/org_2kFr6zKrZzEXec1B3ljCn6iIpOf");
  redirect("/organization/org_2kFr6zKrZzEXec1B3ljCn6iIpOf");
}
