const LawyerService = require("../services/lawyerService");
const AppError = require("../errors/index");
const { lawyerSchema } = require("../lib/validators/lawyerValidator");

async function createLawyer(req, res) {
  console.log("Lawyer creation request body:", req.body);

  try {
    const validationResult = lawyerSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ status: "error", errors: validationResult.error.errors });
    }

    const lawyerData = validationResult.data;

    const lawyer = await LawyerService.createLawyer(lawyerData);

    return res.status(201).json({ status: "success", data: lawyer });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message || "Internal server error" });
  }
}

async function getAllLawyers(req, res) {
  try {
    const lawyers = await LawyerService.getAllLawyers(req.query);
    return res.status(200).json({ status: "success", data: lawyers });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

async function getLawyerById(req, res) {
  try {
    const lawyer = await LawyerService.getLawyerById(req.params.id);
    if (!lawyer) {
      throw new AppError("Lawyer not found", 404);
    }
    return res.status(200).json({ status: "success", data: lawyer });
  } catch (error) {
    return res.status(error.code || 500).json({ status: "error", message: error.message });
  }
}

async function updateLawyer(req, res) {
  try {
    // Validate request body
    const validationResult = lawyerSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ status: "error", errors: validationResult.error.errors });
    }

    const updatedLawyer = await LawyerService.updateLawyer(req.params.id, validationResult.data);
    if (!updatedLawyer) {
      throw new AppError("Lawyer not found", 404);
    }

    return res.status(200).json({ status: "success", data: updatedLawyer });
  } catch (error) {
    return res.status(error.code || 500).json({ status: "error", message: error.message });
  }
}

async function deleteLawyer(req, res) {
  try {
    const deletedLawyer = await LawyerService.deleteLawyer(req.params.id);
    if (!deletedLawyer) {
      throw new AppError("Lawyer not found", 404);
    }

    return res.status(200).json({ status: "success", message: "Lawyer deleted successfully" });
  } catch (error) {
    return res.status(error.code || 500).json({ status: "error", message: error.message });
  }
}

async function findNearestLawyers(req, res) {
  console.log("✅ Nearest Lawyers API hit!"); // Debug 

  try {
    const { latitude, longitude } = req.query;
    // if (!latitude || !longitude) {
    //   return res.status(400).json({ status: "error", message: "Latitude and longitude are required" });
    // }

    const nearestLawyers = await LawyerService.findNearestLawyers(parseFloat(latitude), parseFloat(longitude));
    return res.status(200).json({ status: "success", data: nearestLawyers });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  createLawyer,
  getAllLawyers,
  getLawyerById,
  updateLawyer,
  deleteLawyer,
  findNearestLawyers,
};
