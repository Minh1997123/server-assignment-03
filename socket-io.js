let io;

// tao 1 file chia se io de nhieu file khac cung dung ma ko can cau hinh lai
module.exports = {
  // tao io
  init: (httpServer) => {
    io = require("socket.io")(
      httpServer,
      // cau hinh cors rieng cho socket.io
      {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      }
    );
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("ko co socket");
    }
    // lay io su dung o file khac
    return io;
  },
};
