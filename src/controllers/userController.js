import * as UserService from "../service/userServices.js";

export const getAllUsersHandler = async (req, res, next) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUserById(id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserHandler = async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);
    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
