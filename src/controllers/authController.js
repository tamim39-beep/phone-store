import { request } from "express";
import * as authService from "../service/authService.js";

export const registerHandler = async (req, res, next) => {
  try {
    const response = await authService.register(req.body);
    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
