import * as UserService from "../service/userServices.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUserById(id);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};
