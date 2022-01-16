import React, { useEffect } from "react";
import io from "socket.io-client";
import Layout from "../../../components/Layout";
import UserContext from "../../../components/userContext";
import Message from "../../../components/Chat/Message";
import { useContext, useState, useRef } from "react";
import axios from "../../../config/axios";

import Sidebar from "../../../components/SideNav";
import styles from "./index.module.scss";

const Chat = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    //disconnect socket when the component unmounts
    if (!socket) return;
    return () => {
      console.log("disconnecting socket");
      socket.disconnect();
    };
  }, []);
  useEffect(async () => {
    if (Object.keys(user).length !== 0) {
      const messages = await axios.get(`/api/messages/${user.location}`);
      setMessages(messages.data.messages);

      const socket = io("http://localhost:4000/chat", {
        auth: {
          id: user._id,
        },
        query: {
          location: user.location,
        },
      });

      setSocket(socket);
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("message", ({ message, author }) => {
        console.log(message);
        setMessages((messages) => {
          return [
            ...messages,
            {
              message: message,
              author: author,
            },
          ];
        });
      });
    }
  }, [socket]);

  //const location = user.location;
  const newMsg = (e) => {
    e.preventDefault();
    socket.emit("new-message", { body: message });

    setMessages((messages) => {
      return [
        ...messages,
        {
          message: message,
          author: user,
        },
      ];
    });
    setMessage("");
  };

  useEffect(() => {}, [messages]);
  return (
    <Layout>
      <Sidebar />
      <div className={styles.main}>
        <h1 className={styles.main__heading}>Chat</h1>
        <p>For {user.location} workers</p>
        <br />
        <div className={styles.main__messages}>
          {messages.map((message) => {
            return (
              <Message message={message.message} author={message.author} />
            );
          })}

          <div ref={scrollRef}></div>
        </div>
        <form onSubmit={(e) => newMsg(e)} className={styles.main__form}>
          <input
            type="text"
            placeholder="Talk about tasks, payments, or anything else"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.main__form__input}
          />
          <button
            onClick={(e) => {
              newMsg(e);
            }}
            className={styles.main__form__submit}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.6665 28L30.6665 16L2.6665 4V13.3333L22.6665 16L2.6665 18.6667V28Z"
                fill="#616E7C"
              />
            </svg>
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default Chat;
