import Doctor from "../models/doctor.model.js";

const createDoctor = async (req, res) => {
  try {
    const {
      name,
      specialty,
      phone,
      email,
      address,
      available,
      experience,
      fees,
      profileImage, // Optional during creation
    } = req.body;

    // Validation
    if (
      !name ||
      !specialty ||
      !phone ||
      !email ||
      !address ||
      !experience ||
      !fees
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required except profile image",
      });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor already exists" });
    }

    // Create doctor with optional profileImage
    const doctor = await Doctor.create({
      name,
      specialty,
      phone,
      email,
      address,
      available,
      experience,
      fees,
      profileImage: profileImage || "", // Default to an empty string if not provided
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    console.error("Create Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      message: "All doctors retrieved successfully",
      doctors,
    });
  } catch (error) {
    console.error("Get All Doctors Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor retrieved successfully",
      doctor,
    });
  } catch (error) {
    console.error("Get Doctor By ID Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const {
      name,
      specialty,
      phone,
      email,
      address,
      available,
      experience,
      fees,
      profileImage,
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Update only provided fields
    if (name) doctor.name = name;
    if (specialty) doctor.specialty = specialty;
    if (phone) doctor.phone = phone;
    if (email) doctor.email = email;
    if (address) doctor.address = address;
    if (available !== undefined) doctor.available = available;
    if (experience) doctor.experience = experience;
    if (fees) doctor.fees = fees;
    if (profileImage) doctor.profileImage = profileImage;

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Update Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Delete Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
