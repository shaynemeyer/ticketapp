import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required.").max(255),
  username: z.string().min(3, "Username is required.").max(50),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(75)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Role is required").max(10),
});

export type UserFormData = z.infer<typeof userSchema>;
