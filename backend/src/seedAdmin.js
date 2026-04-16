import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existe = await User.findOne({ email: "admin@test.com" });

    if (existe) {
      console.log("⚠️ Admin ya existe");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      nombre: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin creado correctamente");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();