// // const express = require("express");
// // const multer = require("multer");
// // const { uploadDocument } = require("../controllers/documentController");
// // //const {verifyToken} = require('../middleware/verifyToken');

// // const router = express.Router();

// // // Multer configuration
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/"); // Ensure this folder exists
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });

// // const upload = multer({ storage });

// // // Define the route with multer middleware
// // router.post("/upload", upload.single("file"), uploadDocument);

// // module.exports = router;


// routes/documentRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadDocument, getDocuments,getDocumentById } = require("../controllers/documentController");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Define routes
router.post("/upload", upload.single("file"), uploadDocument);
router.get("/getDocuments", getDocuments);
router.get("/documents/:id", getDocumentById);

module.exports = router;


// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { uploadDocument, getDocuments } = require("../controllers/documentController");

// const router = express.Router();

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });


// // Define routes
// // POST route for document upload
// router.post("/upload", upload.single("file"), uploadDocument);

// // GET route to fetch documents
// router.get("/", getDocuments);

// module.exports = router;
