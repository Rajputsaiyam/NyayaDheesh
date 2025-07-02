// const documentService = require("../services/documentService");
// const { documentSchema } = require("../lib/validators/documentValidator");
// const pdfParse = require("pdf-parse");
// const fs = require("fs");

// const uploadDocument = async (req, res) => {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     // Validate request body using Zod
//     const validationResult = await documentSchema.safeParseAsync(req.body);
//     if (!validationResult.success) {
//         return res.status(400).json({ error: validationResult.error.errors });
//     }

//     // Ensure only PDF files are allowed
//     if (req.file.mimetype !== "application/pdf") {
//         fs.unlinkSync(req.file.path); // Delete the invalid file
//         return res.status(400).json({ error: "Only PDF files are allowed" });
//     }

//     try {
//         // Read the uploaded PDF file
//         const pdfBuffer = fs.readFileSync(req.file.path);
//         const pdfData = await pdfParse(pdfBuffer);
//         const extractedText = pdfData.text;

//         // Save file metadata and extracted text to the database
//         const document = await documentService.uploadDocument({
//             title: validationResult.data.title,
//             fileUrl: req.file.path, // Use req.file.location for S3
//             summary: extractedText.substring(0, 500), // Store first 500 characters
//             uploadedBy: req.user.id, // Assuming user is authenticated
//         });

//         // Cleanup: Remove file after extracting text (Optional)
//         fs.unlinkSync(req.file.path);

//         return res.status(201).json({ message: "Document uploaded successfully", document });

//     } catch (error) {
//         console.error("❌ Error in uploadDocument:", error);

//         // Delete the file if an error occurs
//         if (fs.existsSync(req.file.path)) {
//             fs.unlinkSync(req.file.path);
//         }

//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

// module.exports = { uploadDocument };


const mongoose = require("mongoose");
const Document = require("../models/Document.model");
const DocumentService = require("../services/documentService");

const uploadDocument = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        // Validate uploadedBy (Check if it's a valid MongoDB ObjectId)
        if (!mongoose.Types.ObjectId.isValid(req.body.uploadedBy)) {
            return res.status(400).json({ error: "Invalid uploadedBy ID format" });
        }

        const document = await Document.create({
            title: req.body.title,
            file: req.file.path,
            summary: "Extracted text summary...",
            uploadedBy: req.body.uploadedBy, // Must be a valid ObjectId
        });

        return res.status(201).json({ message: "Document uploaded successfully", document });

    } catch (error) {
        console.error("❌ Error uploading document:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const getDocuments = async (req, res) => {
    console.log("Fetching documents...");
    try {
        const documents = await DocumentService.getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents", error });
    }
};

const getDocumentById = async (req, res) => {
    console.log("Fetching document by ID...");
    try {
      const { id } = req.params;//id is fileurl
      const document = await DocumentService.getDocumentById(id);
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document", error });
    }
  };

module.exports = { uploadDocument,getDocuments,getDocumentById };


// const mongoose = require("mongoose");
// const Document = require("../models/Document.model");
// const DocumentService = require("../services/documentService");

// const uploadDocument = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No file uploaded" });
//         }

//         const { title, uploadedBy } = req.body;

//         // Validate uploadedBy as a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(uploadedBy)) {
//             return res.status(400).json({ error: "Invalid uploadedBy ID format" });
//         }

//         const document = await Document.create({
//             title,
//             fileUrl: req.file.path,
//             summary: "Extracted text summary...", // Placeholder summary
//             uploadedBy,
//         });

//         return res.status(201).json({ message: "Document uploaded successfully", document });
//     } catch (error) {
//         console.error("❌ Error uploading document:", error);
//         return res.status(500).json({ error: "Internal server error", details: error.message });
//     }
// };

// const getDocuments = async (req, res) => {
//     try {
//         console.log("Fetching documents...");
//         const documents = await DocumentService.getAllDocuments();
//         return res.status(200).json(documents);
//     } catch (error) {
//         console.error("❌ Error fetching documents:", error);
//         return res.status(500).json({ message: "Error fetching documents", details: error.message });
//     }
// };

// const getDocumentById = async (req, res) => {
//     try {
//         console.log("Fetching document by ID...");
//         const { id } = req.params;

//         // Validate if the ID is a valid MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: "Invalid document ID format" });
//         }

//         const document = await DocumentService.getDocumentById(id);
        
//         if (!document) {
//             return res.status(404).json({ message: "Document not found" });
//         }

//         return res.status(200).json(document);
//     } catch (error) {
//         console.error("❌ Error fetching document by ID:", error);
//         return res.status(500).json({ message: "Error fetching document", details: error.message });
//     }
// };

// module.exports = { uploadDocument, getDocuments, getDocumentById };







// const mongoose = require("mongoose");
// const Document = require("../models/Document.model");

// // Upload document controller
// const uploadDocument = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const { title, uploadedBy } = req.body;

//     // Validate uploadedBy as a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(uploadedBy)) {
//       return res.status(400).json({ error: "Invalid uploadedBy ID format" });
//     }

//     const document = await Document.create({
//       title,
//       fileUrl: req.file.path,
//       summary: "Extracted text summary...", // Placeholder summary
//       uploadedBy,
//     });

//     return res.status(201).json({ message: "Document uploaded successfully", document });
//   } catch (error) {
//     console.error("❌ Error uploading document:", error);
//     return res.status(500).json({ error: "Internal server error", details: error.message });
//   }
// };

// // Get all documents controller
// const getDocuments = async (req, res) => {
//   try {
//     const documents = await Document.find().populate("uploadedBy", "name email");
//     return res.status(200).json(documents);
//   } catch (error) {
//     console.error("❌ Error fetching documents:", error);
//     return res.status(500).json({ error: "Internal server error", details: error.message });
//   }
// };

// module.exports = { uploadDocument, getDocuments };
