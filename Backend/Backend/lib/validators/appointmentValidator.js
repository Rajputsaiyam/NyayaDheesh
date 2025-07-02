import { z } from "zod";

export const appointmentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  lawyerId: z.string().min(1, "Lawyer ID is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  status: z.enum(["pending", "confirmed", "cancelled"]).default("pending"),
});
