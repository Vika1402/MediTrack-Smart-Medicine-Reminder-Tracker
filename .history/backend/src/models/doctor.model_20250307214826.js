import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    description: { type: String }, // Short bio ya specialization info
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
