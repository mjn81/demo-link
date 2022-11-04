import { IUser } from "../interfaces";
import { Room } from "../models";

class RoomService {
  private static _instance: RoomService = new RoomService();

  private constructor() {
    if (RoomService._instance) {
      throw new Error(
        "Error: Instantiation failed: Use AuthController.getInstance() instead of new."
      );
    }
    RoomService._instance = this;
  }

  public static getInstance(): RoomService {
    return RoomService._instance;
  }

  public async createSelfRoom(user: IUser) {
    const room = await Room.create({
      name: user.username,
      recipients: [user._id],
      isConv: true,
    });
    return room;
  }
}

export const roomService = RoomService.getInstance();