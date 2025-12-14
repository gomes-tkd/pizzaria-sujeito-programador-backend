import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { router } from "./routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT_BACKEND;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
