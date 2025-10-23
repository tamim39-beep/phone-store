import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";

export const getAllUsers = async () => {
  const [users] = await pool.query(
    "SELECT id, username, email, role, address, fullname FROM users"
  );
  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, username, email, role, address, fullname FROM users WHERE id = ?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }
  return users[0];
};
