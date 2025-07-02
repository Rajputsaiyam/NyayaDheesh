const express = require("express");
const router = express.Router();
const LawyerController = require("../controllers/lawyerController");


router.post("/addLawyer", LawyerController.createLawyer);
router.get("/nearest", LawyerController.findNearestLawyers);
router.get("/getallLawyer", LawyerController.getAllLawyers);
router.get("/:id/getLawyerById", LawyerController.getLawyerById);
router.put("/:id/updateLawyer", LawyerController.updateLawyer);
router.delete("/:id/deleteLawyer", LawyerController.deleteLawyer);

module.exports = router;


//http://localhost:8000/api/lawyer/nearest?latitude=28.7041&longitude=77.1025