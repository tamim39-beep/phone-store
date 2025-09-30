import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routes/usersRoute.js";

const app = express();

app.use(express.json());

const PORT = 3000;

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testConnection();
});
