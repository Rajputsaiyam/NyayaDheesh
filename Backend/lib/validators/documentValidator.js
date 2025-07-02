const { z } = require("zod");

// Document Upload Validation Schema
const documentSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
});

// Middleware to validate PDF files
const validateFileType = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "File is required" });
    }
    
    // Check if file is a PDF
    if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    next();
};

module.exports = { documentSchema, validateFileType };
