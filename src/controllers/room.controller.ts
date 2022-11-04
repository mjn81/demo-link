import { Request, Response } from "express";

import { BaseError } from "../errors";
import { userAuth } from "../helpers";
import { Room, User } from "../models";

export class RoomController {
  private static _instance: RoomController = new RoomController();

  private constructor() {
    if (RoomController._instance) {
      throw new Error(
        "Error: Instantiation failed: Use AuthController.getInstance() instead of new."
      );
    }
    RoomController._instance = this;
  }

  public static getInstance(): RoomController {
    return RoomController._instance;
  }

  public async createSelfRoom(req: Request, res: Response) {
    const { username } = req.body;
    if (!username) throw new BaseError("Username is required", 400);
    const user = await User.findOne({ username });
    if (!user) throw new BaseError("User not found", 404);
    const room = await Room.create({
      name: username,
      recipients: [user._id],
      isConv: true,
    });
    return res.status(200).json({ room });
  }

  public async createRoom(req: Request, res: Response) {
    const {
      name,
      recipients,
      isConv,
    }: { name: string; recipients: []; isConv: boolean } = req.body;
    if (!name) throw new BaseError("Room name is required", 400);
    if (!recipients.length)
      throw new BaseError("Recipients are required", 400);
    if (isConv && recipients.length > 2)
      throw new BaseError("Invalid recipients number", 400);
    const room = await Room.create({ name, recipients, isConv });
    return res.status(200).json({ room });
  }

  public async getRooms(req: Request, res: Response) {
    const { id } = await userAuth(req.user);
    const user = await User.findOne({ _id: id });
    if (!user) throw new BaseError("User not found", 404);
    const rooms = await Room.find({ recipients: user._id });
    return res.status(200).json({ rooms });
  }

  public async getRoomsByName(req: Request, res: Response) {
    const { name: roomName } = req.query;
    const { username } = req.body;
    if (!username) throw new BaseError("Username is required", 400);
    if (!roomName) throw new BaseError("Room name is required", 400);
    const user = await User.findOne({ username });
    if (!user) throw new BaseError("User not found", 404);
    const rooms = await Room.find({
      name: { $regex: roomName, $options: "i" },
      isConv: false,
    });
    if (rooms.length == 0) throw new BaseError("Room not found", 404);
    return res.status(200).json({ rooms });
  }

  public async addRecipient(req: Request, res: Response) {
    const { id: roomId } = req.params;
    const { recipients }: { recipients: string[] } = req.body;
    if (!roomId) throw new BaseError("Room id is required", 400);
    if (!recipients) throw new BaseError("Recipient id is required", 400);
    const room = await Room.findById(roomId);
    if (!room) throw new BaseError("Room not found", 404);
    recipients.forEach((recipient) => {
      if (!room.recipients.includes(recipient))
        room.recipients.push(recipient);
    });
    await room.save();
    return res.status(200).json({ message: "recipients added." });
  }

  public async removeRecipient(req: Request, res: Response) {
    const { id: roomId } = req.params;
    const { recipients } = req.body;
    if (!roomId) throw new BaseError("Room id is required", 400);
    if (!recipients) throw new BaseError("Recipient id is required", 400);
    const room = await Room.findById(roomId);
    if (!room) throw new BaseError("Room not found", 404);
    room.recipients = room.recipients.filter((id) => {
      return !recipients.includes(id);
    });
    await room.save();
    return res.status(200).json({ message: "user/users removed." });
  }

  public async changeRoomName(req: Request, res: Response) {
    const { id: roomId } = req.params;
    const { name } = req.body;
    if (!roomId) throw new BaseError("Room id is required", 400);
    if (!name) throw new BaseError("Room name is required", 400);
    const room = await Room.findById(roomId);
    if (!room) throw new BaseError("Room not found", 404);
    room.name = name;
    await room.save();
    return res.status(200).json({ message: "room name changed." });
  }

  public async getAllRooms(req: Request, res: Response) {
    const rooms = await Room.find();
    return res.status(200).json({ rooms });
  }
}

export const roomController = RoomController.getInstance();
