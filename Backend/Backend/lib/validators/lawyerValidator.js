const { z } = require("zod");

// Define the Lawyer Schema using Zod
const lawyerSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" }),

  expertise: z.array(
    z.string().min(3, { message: "Each expertise must be at least 3 characters" })
  ).nonempty({ message: "At least one expertise is required" }),

  location: z.object({
    pincode: z.string()
      .min(6, { message: "Pincode must be exactly 6 digits" })
      .max(6, { message: "Pincode must be exactly 6 digits" })
      .regex(/^\d{6}$/, { message: "Pincode must be a valid 6-digit number" }),

    latitude: z.number()
      .min(-90, { message: "Latitude must be between -90 and 90" })
      .max(90, { message: "Latitude must be between -90 and 90" }),

    longitude: z.number()
      .min(-180, { message: "Longitude must be between -180 and 180" })
      .max(180, { message: "Longitude must be between -180 and 180" }),

    address: z.string()
      .min(5, { message: "Address must be at least 5 characters long" })
  }),

  experience: z.number()
    .int() // Ensures it's a whole number
    .min(0, { message: "Experience must be a positive whole number" }),

  availability: z.boolean().optional(), // Optional since it has a default value in Mongoose

  contact: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be a 10-digit number" })
  }),

  ratings: z.object({
    totalRatings: z.number().min(0).default(0),
    averageRating: z.number().min(0).max(5).default(0)
  }).optional(), // Optional because Mongoose defaults to 0

  verified: z.boolean().default(false)
});

// Export the schema
module.exports = { lawyerSchema };
