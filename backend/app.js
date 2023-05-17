import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
    path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());


app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

// Routes
import project from "./routes/projectRoutes.js";
import user from "./routes/userRoutes.js";
// import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";
import enroll from "./routes/enrollmentRoutes.js";
import guide from './routes/guideRoutes.js'

app.use("/api", project)
app.use("/api", user)
// app.use("/api", payment)
app.use("/api", other)
app.use("/api", enroll )
app.use("/api", guide )

export default app;


app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleware);