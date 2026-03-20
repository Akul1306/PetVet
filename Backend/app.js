import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import petRouter from "./routes/petRoutes.js";
import { protect } from "./utils/protect.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/petvet/users", userRouter);
app.use("/api/petvet/",petRouter);

app.get("/", protect, (req, res) => {
  res.send("Backend is running");
});

export default app;
