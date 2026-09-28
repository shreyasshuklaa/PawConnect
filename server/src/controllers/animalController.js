const mongoose = require("mongoose");
const Animal = require("../models/Animal");
const Organization = require("../models/Organization");

const createAnimal = async (req, res) => {
  try {
    const {
      name,
      species,
      breed,
      age,
      gender,
      description,
      images,
      location,
      
    } = req.body;


    const organization = await Organization.findOne({
  owner: req.user.userId,
});

if (!organization) {
  return res.status(404).json({
    message: "Organization not found",
  });
}

if (organization.verificationStatus !== "approved") {
  return res.status(403).json({
    message: "Organization is not approved yet",
  });
}



    // 1. Check required fields
    if (!name || !species || age === undefined || !gender) {
      return res.status(400).json({
        message: "Name, species, age and gender are required",
      });
    }

    // 2. Create animal
    const animal = await Animal.create({
      name,
      species,
      breed,
      age,
      gender,
      description,
      images,
      location,
      organization: organization._id,
    });

    // 3. Send response
    res.status(201).json({
      message: "Animal created successfully",
      animal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAnimals = async (req, res) => {
  try {
    const { species, gender, location, adoptionStatus, breed } = req.query;

    const filter = {};

    if (species) {
      filter.species = species;
    }

    if (gender) {
      filter.gender = gender;
    }
if (location || breed) {
  const searchTerm = location || breed;

  filter.$or = [
    {
      location: { $regex: searchTerm, $options: "i" },
    },
    {
      breed: { $regex: searchTerm, $options: "i" },
    },
  ];
}

    if (adoptionStatus) {
      filter.adoptionStatus = adoptionStatus;
    }


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const animals = await Animal.find(filter)
    .skip(skip)
    .limit(limit);

    res.status(200).json({
      message: "Animals fetched successfully",
      count: animals.length,
      page,
      limit,
      animals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAnimalById = async (req, res) => {
  try {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid animal ID",
  });
  }
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    res.status(200).json({
      message: "Animal fetched successfully",
      animal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const updateAnimal = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
        message: "Invalid animal ID",
     });
    }
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    if (req.user.role !== "admin") {
      const organization = await Organization.findOne({
      _id: animal.organization,
      owner: req.user.userId,
    });

  if (!organization) {
    return res.status(403).json({
      message: "You can only update your own animals",
    });
  }
}



    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Animal updated successfully",
      animal: updatedAnimal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteAnimal = async (req, res) => {
  try {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
        message: "Invalid animal ID",
     });
  }
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }
    if (req.user.role !== "admin") {
      const organization = await Organization.findOne({
      _id: animal.organization,
      owner: req.user.userId,
  });

  if (!organization) {
    return res.status(403).json({
      message: "You can only delete your own animals",
    });
  }
}



    await Animal.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Animal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal
};