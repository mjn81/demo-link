import { Server } from "socket.io";
import { Message, OnlineUser } from "../models";

export const chatSocket = (io: Server) => {
  io.on("connection", async (socket) => {
    // @ts-ignore
    const { id } = socket.user;

    socket.join(id);
    await OnlineUser.create({ user: id });
    socket.on("send-message", async ({ roomId, sender, recipients, message }) => {
      if (!message) return;
      const msg = await Message.create({ message, sender, room_id: roomId });
      
      recipients.forEach((recipient) => {
        socket.to(recipient).emit("receive-message", {
          sender,
          message: msg.message,
          // @ts-ignore
          updatedAt: msg.updatedAt,
        });
      });
    });

    socket.on("disconnect",async () => {
      await OnlineUser.deleteOne({ user: id });
    })
  });
};
