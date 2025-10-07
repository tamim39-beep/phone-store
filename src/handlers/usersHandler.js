// mendapatkan semua data user

import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");

    // mapping agar password tidak ikut
    const result = users.map((user) => ({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      address: user.address ?? null,
      phone_number: user.phone_number ?? null,
      age: user.age ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUsersByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE id=?", [id]);

    if (users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const user = users[0];

    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address ?? null,
        phone_number: user.phone_number ?? null,
        age: user.age ?? null,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (!fullname || !fullname.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "fullname is required",
    });
  }

  if (!username || !username.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "username is required",
    });
  }

  if (username.includes(" ")) {
    return res.status(400).json({
      status: "fail",
      message: "username tidak boleh spasi",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "email is required",
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "password is required",
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "role is required",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, username, email, password, role]
    );

    const newUser = {
      id: result.insertId,
      fullname,
      username,
      email,
      role,
      address: null,
      phone_number: null,
      age: null,
    };

    res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
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
