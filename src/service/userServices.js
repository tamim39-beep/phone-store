import { response } from "express";
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

export const createUser = async (userData) => {
  const { fullname, username, email, password, role, address } = userData;

  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address) VALUES (?, ?, ?, ?, ?, ?)",
    [fullname, username, email, password, role, address]
  );

  return {
    id: result.insertId,
    fullname,
    username,
    email,
    password,
    role,
    address,
  };
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;
  try {
    await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ]
    );

    const [userUpdate] = await pool.query(
      "SELECT fullname, username, email, password, role, address, phone_number, age FROM users WHERE id=?",
      [id]
    );

    res.status(200).json({
      status: "success",
      message: "User Updated successfully",
      data: userUpdate,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [deleteUser] = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);

    if (deleteUser.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
