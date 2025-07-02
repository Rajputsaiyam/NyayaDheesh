const { z } = require("zod");

const userSignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "lawyer", "admin"]).optional() // ✅ Ensures role is valid
});


const userLoginSchema = z.object({
    email: z.string(),
    password: z.string().min(1, "Password is required"),
});

module.exports = { userSignUpSchema, userLoginSchema };
