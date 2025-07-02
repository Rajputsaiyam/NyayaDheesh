const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  file: {
    type: String,
    required: true
  }, // Path/URL of the PDF file
  summary: {
    type: String,
    maxlength: 500 // Prevent excessively long summaries
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, // Reference to User
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
