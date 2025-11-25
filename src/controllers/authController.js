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

export const loginHandler = async (req, res, next) => {
  try {
    const response = await authService.login(req.body);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
