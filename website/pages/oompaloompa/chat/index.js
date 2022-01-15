import React, { useEffect } from "react";
import socket from "socket.io-client";
import Layout from "../../../components/Layout";
import UserContext from "../../../components/userContext";
import { useContext, useState } from "react";

import Sidebar from "../../../components/SideNav";
import styles from "./index.module.scss";

const Chat = () => {
  const user = useContext(UserContext);
  const [location, setLocation] = useState(undefined);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [locationsetted, setLocationsetted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [io, setIo] = useState(null);
  const [ioTrue, setIoTrue] = useState(false);
  const [author, setAuthor] = useState({});
  useEffect(() => {
    setLocation(user.user.location);
    setId(user.user._id);
    setAuthor(user.user);

    console.log(id);
    console.log(user.user.location);
    console.log(author);
    if (location !== undefined) {
      console.log("okbr");
      console.log(location);
      setLocationsetted(true);
      io.emit("join", { location });
      console.log("okhi");
      io.on("connect-message", (data) => {
        console.log(data);
        setMessages(data);
      });
    }
  }, [user]);
  useEffect(() => {
    console.log("ok");
    setIo(socket("http://localhost:4000/chat"));
    setIoTrue(true);
  }, []);

  useEffect(() => {
    if (ioTrue) {
      io.on("server-message", (name, authorId, location) => {
        console.log(authorId);
        setMessages((prevmessages) => {
          return [
            ...prevmessages,
            {
              message: name,
              author: authorId[0],
              location: location,
            },
          ];
        });
      });
    }
  }, [io]);

  //const location = user.location;
  const formSubmitHoGaya = (e) => {
    e.preventDefault();
    io.emit("message", { messagename: message, id: id, location: location });
    console.log(message, location);
  };
  return (
    <Layout>
      <Sidebar />
      <div className={styles.main}>
        <h1 className={styles.main__heading}>Chat</h1>
        {messages.map((message) => {
          console.log(message);
          return (
            <div>
              <h1>{message.message}</h1>
              <h2>{message.author.name}</h2>
              <img src={message.author.photoUrl} alt="" />
            </div>
          );
        })}
        <form onSubmit={(e) => formSubmitHoGaya(e)}>
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </Layout>
  );
};
export default Chat;
