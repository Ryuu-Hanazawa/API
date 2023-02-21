require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server); 

global.io = io;

// Set static folder
app.use(express.static("public"));

app.use(cors());

// Add logger
app.use(logger("dev"));

// Run when client connects
io.on("connection", (socket) => {
  const id = socket.handshake.query.id;

  socket.join(id);

  socket.on("chat message", (msg, id_recipient) => {
    io.to(id_recipient).to(id).emit("chat message", msg);
  });

  socket.on("fromBuyer", msgEvent => {
    socket.emit("fromBuyer", msgEvent);
  });

  socket.on("fromSeller", msgEvent => {
    socket.emit("fromSeller", msgEvent);
  });
});

// Bodyparser help to parse the request and create req.body that
// need to access in specify routes
// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: false
}));

// parse requests of content-type: application/json
app.use(express.json());

// Router
app.use("/", require("./src/routes/index"));
app.use("/user", require("./src/routes/user"));
app.use("/products", require("./src/routes/products"));
app.use("/product", require("./src/routes/product"));
app.use("/search", require("./src/routes/search"));
app.use("/history", require("./src/routes/history"));
app.use("/auth", require("./src/routes/auth"));
app.use("/address", require("./src/routes/addresses"));
app.use("/chat", require("./src/routes/chats"));

const PORT = 8000;

// set port, listen for requests
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});