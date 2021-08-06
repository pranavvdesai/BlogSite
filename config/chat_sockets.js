// observer
module.exports.chatSockets = (socketServer) => {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    socket.on("join_room", (data) => {
      console.log("joining req received", data);
      socket.join(data.chatroom);

      // notify all users in the chatroom
      // emit in a specific chat room
      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send_message", (data) => {
      console.log("message received", data);
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
