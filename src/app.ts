import express from "express";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import { config } from "dotenv";
import "express-async-errors";
import {
  authRouter,
  playgroundRouter,
  userRouter,
  roomRouter,
} from "./routes";
import { errorHandlingMiddleware } from "./middlewares";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const main = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
	if(!MONGO_URL) throw new Error('MONGO_URL is not defined in .env file');
 
	mongoose.connect(MONGO_URL, () => {
    console.log("mongodb connected");
  });

  app.use("/auth", authRouter);
  app.use("/playground", playgroundRouter);
  app.use("/user", userRouter);
  app.use("/room", roomRouter);
  
	app.use(errorHandlingMiddleware);

  io.on("connection", (socket) => {
    console.log("a user connected");
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

main();
