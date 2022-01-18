import { useRouter } from "next/router";
import axios from "../../../config/axios";
import { useEffect, useContext, useState, useRef } from "react";
import UserContext from "../../../components/userContext";
import Layout from "../../../components/Layout";
import Message from "../../../components/Chat/Message";
import SideNav from "../../../components/SideNav";
import io from "socket.io-client";
import styles from "./index.module.scss";

export default function Chat() {
  const [loc, setLoc] = useState("");
  const router = useRouter();

  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (router.query.location) {
      setLoc(router.query.location);
    }
  }, [router.query.location]);

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
      if (loc !== "") {
        const messagesResponse = await axios.get(`/api/messages/${loc}`);
        setMessages(messagesResponse.data.messages);

        const socket = io("http://localhost:4000/chat", {
          auth: {
            id: user._id,
          },
          query: {
            location: loc,
          },
        });

        setSocket(socket);
      }
    }
  }, [user, loc]);

  useEffect(() => {
    if (socket) {
      socket.on("message", ({ message, author }) => {
        console.log(message, author);
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

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout>
      <SideNav />
      <div className={styles.main}>
        <div className={styles.main__header}>
          <div className={styles.main__header__title}>
            <h1 className={styles.main__header__title__heading}>Chat</h1>
            <p className={styles.main__header__title__description}>
              for <b>{loc}</b> workers
            </p>
          </div>
        </div>

        <div className={styles.main__messages}>
          {messages.map((message) => {
            return (
              <Message message={message.message} author={message.author} />
            );
          })}

          <div ref={scrollRef}></div>
        </div>
        {messages.length == 0 && <div className="noMessages">No Messages</div>}

        <form onSubmit={(e) => newMsg(e)} className={styles.main__form}>
          <input
            type="text"
            placeholder="Talk about tasks, payments, or anything else"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.main__form__input}
            required
          />
          <button
            onClick={(e) => {
              if (message.length === 0) return;

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
}
