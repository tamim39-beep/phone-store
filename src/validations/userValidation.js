import { z } from "zod";

export const CreateUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimum 3 characters"),
  username: z
    .string()
    .min(3, "username minimum 3 characters")
    .refine((s) => !s.includes(" "), {
      message: "username must not contain spaces",
    }),
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "password minimum 6 characters"),

  // ✅ Cara benar untuk enum + custom error message
  role: z.enum(["USER", "ADMIN"], {
    errorMap: () => ({ message: "role harus 'USER' atau 'ADMIN'" }),
  }),
});

export const UpdateUserSchema = z.object({
  fullname: z.string().min(3, "fullname minimum 3 characters").optional(),
});
