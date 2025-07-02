const Lawyer = require("../models/Lawyer.model");
const AppError = require("../errors/index");
const axios = require("axios");
const GEOAPIFY_API_KEY = "be51a453762547e7af3402c8c57dab41"; 

class LawyerService {

  static async findNearestLawyers(userLat, userLng) {
    try {
      console.log(`🔍 Received request for nearest lawyers: lat=${userLat}, lng=${userLng}`);

      // Fetch only verified lawyers
      const lawyers = await Lawyer.find({ verified: true });

      console.log(`📜 Found ${lawyers.length} lawyers in the database.`);

      if (!lawyers.length) {
        console.warn("⚠️ No verified lawyers found in the database.");
        return [];
      }

      let nearestLawyers = lawyers.map(lawyer => {
        if (!lawyer.location || lawyer.location.latitude === undefined || lawyer.location.longitude === undefined) {
          console.warn(`⚠️ Lawyer ${lawyer.name} has missing location data.`);
          return null; // Ignore lawyers with missing location
        }

        return {
          lawyer,
          distance: Math.sqrt(
            Math.pow(lawyer.location.latitude - userLat, 2) +
            Math.pow(lawyer.location.longitude - userLng, 2)
          )
        };
      }).filter(lawyer => lawyer !== null); // Remove null values

      if (!nearestLawyers.length) {
        console.warn("⚠️ No lawyers with valid location data.");
        return [];
      }

      // Sort by distance
      nearestLawyers.sort((a, b) => a.distance - b.distance);
      console.log("✅ Nearest lawyers sorted successfully.");

      return nearestLawyers.slice(0, 5).map(lawyer => lawyer.lawyer);
    } catch (error) {
      console.error("🚨 Error in findNearestLawyers:", error);
      throw new Error("Failed to find nearest lawyers.");
    }
  }


  static async getCoordinatesFromPincode(pincode) {
    try {
      const response = await axios.get("https://api.geoapify.com/v1/geocode/search", {
        params: {
          postcode: pincode,
          country: "IN",
          apiKey: GEOAPIFY_API_KEY,
          format: "json"
        }
      });

      // if (!response.data.features || response.data.features.length === 0) {
      //   throw new Error("Invalid Pincode");
      // }

      const { lat, lon } = response.data.features[0].properties; // Extract latitude & longitude
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
      console.error("Error fetching coordinates:", error.message);
      return null;
    }
  }


  // ✅ Create a new lawyer with automatic geolocation from pincode
  static async createLawyer(lawyerData) {
    try {
      //const coordinates = await this.getCoordinatesFromPincode(lawyerData.location.pincode);
      // if (!coordinates) {
      //   throw new AppError("Invalid Pincode", 400);
      // }

      // lawyerData.location.latitude = coordinates.latitude;
      // lawyerData.location.longitude = coordinates.longitude;

      const lawyer = new Lawyer(lawyerData);
      await lawyer.save();
      return lawyer;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  // ✅ Retrieve all lawyers with optional filtering
  static async getAllLawyers(filters) {
    try {
      let query = {};

      if (filters.expertise) {
        query.expertise = { $in: filters.expertise.split(",") };
      }

      if (filters.minExperience) {
        query.experience = { $gte: parseInt(filters.minExperience) };
      }

      if (filters.verified) {
        query.verified = filters.verified === "true";
      }

      return await Lawyer.find(query);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  // ✅ Retrieve a single lawyer by ID
  static async getLawyerById(id) {
    try {
      const lawyer = await Lawyer.findById(id);
      if (!lawyer) {
        throw new AppError("Lawyer not found", 404);
      }
      return lawyer;
    } catch (error) {
      throw new AppError("Invalid Lawyer ID", 400);
    }
  }

  // ✅ Update an existing lawyer
  static async updateLawyer(id, updateData) {
    try {
      if (updateData.location?.pincode) {
        const coordinates = await this.getCoordinatesFromPincode(updateData.location.pincode);
        if (!coordinates) {
          throw new AppError("Invalid Pincode", 400);
        }
        updateData.location.latitude = coordinates.latitude;
        updateData.location.longitude = coordinates.longitude;
      }

      const lawyer = await Lawyer.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!lawyer) {
        throw new AppError("Lawyer not found", 404);
      }
      return lawyer;
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  // ✅ Delete a lawyer by ID
  static async deleteLawyer(id) {
    try {
      const lawyer = await Lawyer.findByIdAndDelete(id);
      if (!lawyer) {
        throw new AppError("Lawyer not found", 404);
      }
      return lawyer;
    } catch (error) {
      throw new AppError("Invalid Lawyer ID", 400);
    }
  }
}

module.exports = LawyerService;
