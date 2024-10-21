import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoutes from "./routes/summarize.js";
import userRouter from "./routes/user.route.js";
import { connectDb } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api", summarizeRoutes);
app.use("/user", userRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGO db connection failed:", err);
  });
