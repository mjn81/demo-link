import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const onlineUser = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const OnlineUser = model("OnlineUser", onlineUser);
