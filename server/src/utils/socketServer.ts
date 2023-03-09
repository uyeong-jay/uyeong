import { Socket } from "socket.io";

export const socketServer = (socket: Socket) => {
  socket.on("joinRoom", (postId: string) => {
    socket.join(postId);
    console.log({ joinRoom: socket.rooms });
  });

  socket.on("outRoom", (postId: string) => {
    socket.leave(postId);
    console.log({ outRoom: socket.rooms });
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
};
