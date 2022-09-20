const {io} = require("../index");
const Band = require("../models/Band");
const Bands = require("../models/Bands");

const bands = new Bands();
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Héroes del Silencio"));
bands.addBand(new Band("Metallica"));

console.log(bands);


io.on("connection", (client) => {
  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  client.on("message", (data) => {
    console.log(data);

    io.emit("message", {
      admin: "New message"
    });
  });

  client.on("new-message", (data) => {
    console.log(data);
    client.broadcast.emit("new-message", data);
  });

  client.on("vote-band", (data) => {
    bands.voteBand(data.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (data) => {
    const newBand = new Band(data.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (data) => {
    bands.deleteBand(data.id);
    io.emit("active-bands", bands.getBands());
  });
});
