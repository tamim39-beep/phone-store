import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { CreateUserSchema, UpdateUserSchema } from "../validations/userValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcryptjs";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
  );
  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return users[0];
};

export const createUser = async (req) => {
  const validated = validate(CreateUserSchema, req);
  const { fullname, username, email, password, role } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, email, hashedPassword, role]
  );

  return {
    id: result.insertId,
    fullname,
    username,
    email,
    role,
  };
};

export const updateUser = async (id, req) => {
  const validated = validate(UpdateUserSchema, req);
  const {
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
    password, // optional
  } = validated;

  // jika user mengubah password
  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const [result] = await pool.query(
    `UPDATE users 
     SET fullname=?, username=?, email=?, role=?, address=?, phone_number=?, age=?${hashedPassword ? ", password=?" : ""} 
     WHERE id=?`,
    hashedPassword
      ? [fullname, username, email, role, address, phone_number, age, hashedPassword, id]
      : [fullname, username, email, role, address, phone_number, age, id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to update user");
  }

  const [userUpdated] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  return userUpdated[0];
};

export const deleteUser = async (id) => {
  await getUserById(id);

  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to delete user");
  }

  return {
    message: "User deleted successfully",
  };
};
