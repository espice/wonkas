const dotenv = require("dotenv");
dotenv.config();

require("module-alias/register");

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const auth = require("@routes/auth");
const tasks = require("@routes/tasks");
const cart = require("@routes/api/cart");
const app = express();
const bcrypt = require("bcrypt");

const server = require("http").createServer(app);

const io = require("socket.io")(server);

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
