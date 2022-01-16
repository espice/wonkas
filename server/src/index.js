const dotenv = require("dotenv");
dotenv.config();

require("module-alias/register");

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const auth = require("@routes/auth");
const tasks = require("@routes/tasks");
const cart = require("@routes/api/cart");
const oompaloompas = require("@routes/oompaloompas");
const messages = require("@routes/api/messages");
const products = require("@routes/products");
const app = express();
const bcrypt = require("bcrypt");
const message = require("@models/message");
const user = require("@models/user");
const server = require("http").createServer(app);
const paycheck = require("@routes/paycheck");

bcrypt.hash("mypassword", 15, function (err, hash) {});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB......."))
  .catch((err) => console.log(err));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const chat = io.of("/chat");
chat.on("connection", async (socket) => {
  if (Object.keys(socket.handshake.auth).length !== 0) {
    const location = socket.handshake.query.location;
    socket.join(location);
  } else {
    socket.disconnect();
  }

  socket.on("new-message", async ({ body }) => {
    console.log(body);
    const location = socket.handshake.query.location;
    const id = socket.handshake.auth.id;

    const newMessage = await new message({
      message: body,
      author: id,
      location: location,
    });
    newMessage.save();

    const author = await user
      .findOne({ _id: id })
      .select("name email isManager photoUrl role _id");

    socket
      .to(location)
      .emit("message", { message: newMessage.message, author: author });;
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/tasks", tasks);
app.use("/api/cart", cart);
app.use("/products", products);
app.use("/api/messages", messages);
app.use("/oompaloompas", oompaloompas);
app.use("/paycheck", paycheck)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", (req, res) => {
  user_data = user.find({ _id: req.body.id });
  console.log(user_data);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
