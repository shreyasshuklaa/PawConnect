const AdoptionApplication = require("../models/AdoptionApplication");
const Animal = require("../models/Animal");
const Organization = require("../models/Organization");

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

const getOrganizationApplications = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      owner: req.user.userId,
    });

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    const applications = await AdoptionApplication.find({
      organization: organization._id,
    })
      .populate("applicant", "name email")
      .populate("animal", "name species breed age gender")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Adoption applications fetched successfully",
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const approveAdoptionApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Adoption application not found",
      });
    }

    // Find shelter organization
    const organization = await Organization.findOne({
      _id: application.organization,
      owner: req.user.userId,
    });

    if (!organization) {
      return res.status(403).json({
        message: "You can only manage your own applications",
      });
    }

    // Check application status
    if (application.status !== "pending") {
      return res.status(400).json({
        message: "Only pending applications can be approved",
      });
    }

    // Find animal
    const animal = await Animal.findById(application.animal);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    // Update application
    application.status = "approved";
    application.reviewedAt = new Date();

    await application.save();

    // Update animal
    animal.adoptionStatus = "adopted";

    await animal.save();

    res.status(200).json({
      message: "Adoption application approved successfully",
      application,
      animal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const rejectAdoptionApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Adoption application not found",
      });
    }

    // Find shelter organization
    const organization = await Organization.findOne({
      _id: application.organization,
      owner: req.user.userId,
    });

    if (!organization) {
      return res.status(403).json({
        message: "You can only manage your own applications",
      });
    }

    // Check application status
    if (application.status !== "pending") {
      return res.status(400).json({
        message: "Only pending applications can be rejected",
      });
    }

    // Update application
    application.status = "rejected";
    application.reviewedAt = new Date();

    await application.save();

    res.status(200).json({
      message: "Adoption application rejected successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find({
      applicant: req.user.userId,
    })
      .populate("animal", "name species breed age gender")
      .populate("organization", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Your adoption applications fetched successfully",
      count: applications.length,
      applications,
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
  getOrganizationApplications,
  approveAdoptionApplication,
  rejectAdoptionApplication,
  getMyApplications,
};