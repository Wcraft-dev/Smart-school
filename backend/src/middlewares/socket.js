import socketIo from "socket.io";
import User from "../models/auth.model";
import jwt from "jsonwebtoken";

let userSocketIdMap = new Map();

function addClientToMap(userName, socketId) {
  if (!userSocketIdMap.has(userName)) {
    //when user is joining first time
    userSocketIdMap.set(userName, new Set([socketId]));
    console.log("New user");
  } else {
    //user had already joined from one client and now joining using another    client;
    userSocketIdMap.get(userName).add(socketId);
    console.log("Existing user but with new device");
  }
}
function removeClientFromMap(userName, socketId) {
  if (userSocketIdMap.has(userName)) {
    let userSocketIdSet = userSocketIdMap.get(userName);
    userSocketIdSet.delete(socketId);
    //if there are no clients for a user, remove that user from online list(map);
    if (userSocketIdSet.size == 0) {
      userSocketIdMap.delete(userName);
    }
  }
}

const verifytoken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return jwt.decode(token);
  } catch (error) {
    return error;
  }
};

export default function listen(server,security) {
  const io = socketIo(server, {
    cors: security,
  });
  io.use(async (socket, next) => {
    const {
      request: {
        headers: { token },
      },
    } = socket;
    try {
      const decode = verifytoken(token).id;
      const existUser = await User.findById(decode, {
        password: 0,
        roles: 0,
        name: 0,
        lastName: 0,
        accountGoogle: 0,
        createdAt: 0,
        updatedAt: 0,
        email: 0,
      });
      if (existUser) {
        socket.auth = [existUser._id, true];
        addClientToMap(`${socket.auth[0]}`, socket.id);
        next();
      }
    } catch (error) {
      socket.auth = [null, false];
    }
  });

  io.sockets.on("connection", (socket) => {
    if (socket.auth[1]) {
      socket.on("Are you connected", (token) => {
        const who = verifytoken(token).id;
        const is = userSocketIdMap.get(who);

        console.log(`search it's  ${who} found ${is}`);

        if (is != undefined) {
          for (let socketId of is) {
            io.to(socketId).emit("Are you connected", true);
          }
        } else {
          io.to(socket.id).emit("Are you connected", false);
        }
      });
      socket.on("connected", () => {
        io.to(socket.id).emit("connected", Array.from(userSocketIdMap.keys()));
      });
      setInterval(() => {
        io.to(socket.id).emit("new notification", `validator 切 ${socket.id}`);
      }, 10000);

      socket.on("notifications", (recipientUserName, messageContent) => {
        //get all clients (socketIds) of recipient
        let recipientSocketIds = userSocketIdMap.get(recipientUserName);
        if (recipientSocketIds != undefined) {
          for (let socketId of recipientSocketIds) {
            io.to(socketId).emit("new notification", messageContent);
          }
        }
      });

      socket.on("disconnect", () => {
        removeClientFromMap(socket.request.headers.user, socket.id);
      });
    }
    io.to(socket.id).emit("Are you connected", false);
  });

  return io;
}
