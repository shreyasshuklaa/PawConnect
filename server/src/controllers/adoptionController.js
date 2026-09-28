const AdoptionApplication = require("../models/AdoptionApplication");
const Animal = require("../models/Animal");

const createAdoptionApplication = async (req, res) => {
  try {
    const { animal, message } = req.body;

    // Required fields
    if (!animal || !message) {
      return res.status(400).json({
        message: "Animal and message are required",
      });
    }

    // Find animal
    const animalData = await Animal.findById(animal);

    if (!animalData) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    // Check availability
    if (animalData.adoptionStatus !== "available") {
      return res.status(400).json({
        message: "This animal is not available for adoption",
      });
    }

    // Prevent duplicate pending application
    const existingApplication =
      await AdoptionApplication.findOne({
        applicant: req.user.userId,
        animal: animal,
        status: "pending",
      });

    if (existingApplication) {
      return res.status(409).json({
        message: "You already have a pending application for this animal",
      });
    }

    // Create application
    const application = await AdoptionApplication.create({
      applicant: req.user.userId,
      animal: animalData._id,
      organization: animalData.organization,
      message,
      status: "pending",
    });

    res.status(201).json({
      message: "Adoption application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createAdoptionApplication,
};