const express = require("express");

const cors = require("cors");

const http = require("http");

const socketio = require("socket.io");

const router = require("./router");

const {
  addUser,
  removeUser,
  getAllUsersInRoom,
  getUser,
} = require("./userFunctions");

const app = express();

const httpServer = http.createServer(app);

const io = socketio(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the ${user.room}!`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if(user){
      io.to(user.room).emit("message", { user: user.name, text: message });
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the chat!`,
      });
    }
  });
});

httpServer.listen(PORT, () =>
  console.log(`server is running at https://localhost:${PORT}`)
);
