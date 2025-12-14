import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { router } from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT_BACKEND;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
