const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  // recieving event 

  socket.on("join", ({ name, room }, callback) => {
    const user = addUser({ id: socket.id, name, room });

    // it's an error message
    if (typeof (user) === "string") {return callback(user)};
    

    // welcoming the user
    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `Hi ${user.name}, Welcome to ${user.room}.`
    });

    // telling everyone else
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined us!.`
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
     callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {  
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  }); 
});

app.use(router);  

server.listen(PORT, () => console.log(`Server has started on post ${PORT}`));
