import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import { logReqRes } from "./middlewares/index.js";
import UserRouter from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3478;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(logReqRes("log.txt"));

app.use("/auth/users", UserRouter);

app.get('/', (req, res) => {
  res.send({
    status: 200,
    success: true,
    message: "Server Running...",
  });
});

app.use((req, res, next) => {
  const error = new Error("Requested URL Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).send({
        status: error.status || 500,
        success: false,
        message: error.message || "Internal Server Error"
    });
});

(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
          console.log("APP RUNNING ON PORT:", PORT)
        );
    } catch (error) {
        console.error("Failed to Start the Server: ", error);
        process.exit(1);
    }
})();
