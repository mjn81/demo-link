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
import {
  errorHandlingMiddleware,
  userAuthMiddleware,
  corsMiddleware,
} from "./middlewares";

import { chatSocket, socketAuthMiddleware } from "./realtime";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      };
    }
  }
}

config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const main = async () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.disable("x-powered-by");
  app.use(corsMiddleware);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (!MONGO_URL) throw new Error("MONGO_URL is not defined in .env file");

  mongoose.connect(MONGO_URL, () => {
    console.log("mongodb connected");
  });

  app.use(userAuthMiddleware);

  app.use("/auth", authRouter);
  app.use("/playground", playgroundRouter);
  app.use("/user", userRouter);
  app.use("/room", roomRouter);

  app.use(errorHandlingMiddleware);

  io.use(socketAuthMiddleware)
  chatSocket(io);

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

main();
