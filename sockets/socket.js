const {io} = require("../index");

io.on("connection", (client) => {
  console.log("Client connected...");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  client.on("message", (data) => {
    console.log(data);

    io.emit("message", {
      admin: "New message"
    });
  });
});
