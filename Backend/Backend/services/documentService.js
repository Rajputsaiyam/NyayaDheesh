const Document = require("../models/Document.model");
const fs = require("fs");
const path = require("path");

const DOCUMENTS_DIR = "uploads/";

const uploadDocument = async ({ title, fileUrl, summary, uploadedBy }) => {
    try {
        if (!title || !uploadedBy) {
            throw new Error("Title and uploadedBy are required fields");
        }

        // Find and update existing document OR create a new one
        const document = await Document.findOneAndUpdate(
            { title, uploadedBy }, // Search criteria
            { fileUrl, summary },  // Fields to update
            { new: true, upsert: true } // Return updated document or insert if not found
        );

        return document;

    } catch (error) {
        console.error("❌ Error in uploadDocument service:", error.message);
        throw new Error(error.message || "Failed to upload document");
    }
};
const getAllDocuments = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(DOCUMENTS_DIR, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.map((file) => ({ filename: file, path: path.join(DOCUMENTS_DIR, file) })));
            }
        });
    });
};

const getDocumentById = async (id) => {
    console.log("Looking for file:", id);
    const filePath = path.join(DOCUMENTS_DIR, id);
    if (fs.existsSync(filePath)) {
        return { filename: id, path: filePath };
    } else {
        console.log("File not found:", filePath);
        return null;
    }
};

module.exports = { uploadDocument, getAllDocuments, getDocumentById };
