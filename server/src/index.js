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
const products = require("@routes/products");
const app = express();
const bcrypt = require("bcrypt");
const message = require("@models/message");
const user = require("@models/user");
const server = require("http").createServer(app);

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
async function makeMessage(messagename, id, location) {
  const newMessage = new message({
    message: messagename,
    author: id,
    location: location,
  });
  await newMessage.save();
}
async function getStartData(location) {
  const messages = await message
    .find({ location: location })
    .populate({ path: "author", model: "User", select: "-password" });
  return messages;
}

const userio = io.of("/chat");
userio.on("connection", (socket) => {
  socket.on("join", (data) => {
    if (
      data.location !== "" &&
      data !== {} &&
      data !== null &&
      data !== undefined &&
      data.location !== undefined
    ) {
      socket.join(data.location);
      var messages = getStartData(data.location).then((value) => {
        console.log(value), socket.emit("connect-message", value);
      });
      console.log(data.location);
    }
  }),
    socket.on("message", (params) => {
      if (mongoose.isValidObjectId(params.id)) {
        console.log(params.messagename, params.location, params.id);
        if (
          params.location.split() !== "" &&
          params.messagename.split() !== ""
        ) {
          makeMessage(params.messagename, params.id, params.location);
          user.find({ _id: params.id }).then((value) => {
            userio
              .to(params.location)
              .emit(
                "server-message",
                params.messagename,
                value,
                params.location
              );
          });
          //socket.to(params.location).emit("server-message", params.messagename, params.location, params.id)
          console.log("ok");
        }
      }
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
app.use("/oompaloompas", oompaloompas);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/profile", (req, res) => {
  user_data = user.find({ _id: req.body.id });
  console.log(user_data);
});
io.on("connection", (socket) => {
  console.log(socket.id);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
