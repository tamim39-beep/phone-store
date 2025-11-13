import { pool } from "../config/db.js";
import { registerSchema } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcryptjs";

export const register = async (requestBody) => {
  // Validasi input
  const validated = validate(registerSchema, requestBody);

  const {
    fullname,
    username,
    email,
    role,
    password,
    address,
    phone_number,
    age,
  } = validated;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user ke database
const [result] = await pool.query(
  `INSERT INTO users 
    (fullname, username, email, password, role, address, phone_number, age) 
   VALUES (?,?,?,?,?,?,?,?)`,
  [fullname, username, email, hashedPassword, role, address, phone_number, age]
);

  // Return user baru (tanpa password)
  return {
    id: result.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
};
