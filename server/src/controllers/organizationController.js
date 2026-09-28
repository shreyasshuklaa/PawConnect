const Organization = require("../models/Organization");

const registerOrganization = async (req, res) => {
  try {
    const {
      name,
      description,
      email,
      phone,
      address,
      registrationNumber,
    } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({
        message: "Name, email and address are required",
      });
    }

    const existingOrganization = await Organization.findOne({ email });

    if (existingOrganization) {
      return res.status(409).json({
        message: "Organization with this email already exists",
      });
    }

    const existingOrganizationByOwner = await Organization.findOne({
  owner: req.user.userId,
});

if (existingOrganizationByOwner) {
  return res.status(409).json({
    message: "You already have an organization",
  });
}

    const organization = await Organization.create({
      name,
      description,
      email,
      phone,
      address,
      registrationNumber,
      owner: req.user.userId,
      verificationStatus: "pending",
    });

    res.status(201).json({
      message: "Organization registered successfully",
      organization,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Get logged-in user's organization
const getMyOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      owner: req.user.userId,
    });

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    res.status(200).json({
      message: "Organization fetched successfully",
      organization,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const getPendingOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({
      verificationStatus: "pending",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Pending organizations fetched successfully",
      count: organizations.length,
      organizations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const approveOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    organization.verificationStatus = "approved";

    await organization.save();

    res.status(200).json({
      message: "Organization approved successfully",
      organization,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const rejectOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    organization.verificationStatus = "rejected";

    await organization.save();

    res.status(200).json({
      message: "Organization rejected successfully",
      organization,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }


};

module.exports = {
  registerOrganization,
  getMyOrganization,
  getPendingOrganizations,
  approveOrganization,
  rejectOrganization,
};