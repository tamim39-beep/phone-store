import { pool } from "../config/db.js";

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
  return users[0];
};
