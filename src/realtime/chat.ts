import { Server } from "socket.io";
import { Message, OnlineUser } from "../models";

export const chatSocket = (io: Server) => {
  io.on("connection", (socket) => {
    // @ts-ignore
    const { id } = socket.user;

    socket.join(id);
    socket.on("send-message", ({ roomId, sender, recipients, message }) => {
      Message.create({ text: message, sender, room_id: roomId });
      recipients.forEach((recipient) => {
        const newRecipients = recipients.filter((r) => r !== recipient);
        newRecipients.push(sender);
        socket.broadcast.to(recipient).emit("receive-message", {
          recipients: newRecipients,
          sender,
          message,
        });
      });
    });
  });
};
