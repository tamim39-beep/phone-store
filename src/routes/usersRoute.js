import express from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
} from "../controllers/userController.js";
import {
  deleteUserHandler,
  updateUserHandler,
} from "../service/userServices.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUserByIdHandler);
userRouter.post("/users", createUserHandler);
userRouter.put("/users/:id", updateUserHandler);
userRouter.delete("/users/:id", deleteUserHandler);

export default userRouter;
