import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const room = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    name: String,
    recipients: [
      {
        type: String,
        required: true,
        ref: "User",
      },
    ],
    isConv: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const Room = model("Room", room);
