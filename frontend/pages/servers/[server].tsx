import { VALID_LOADERS } from "next/dist/shared/lib/image-config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

const Channel = (params: any) => {
  const router = useRouter();
  const [server, setServer] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const { server } = router.query;

    if (!!server) {
      fetch(`http://localhost:3000/servers/${server}`).then((res) => {
        res.json().then((srv) => {
          setServer(srv);
          setMessages(srv.messages.reverse());
        });
      });
    }

    fetch(`http://localhost:3000/users/${localStorage.getItem("id")}`).then(
      (res) => {
        res.json().then((user) => {
          setUser(user);
        });
      }
    );
  }, [router.isReady]);

  return (
    <>
      <div className={styles.serverlist}>
        {user?.servers?.map((val, key) => (
          <a href={`/servers/${val._id}`}>
            <button
              className={
                val._id === server._id ? styles.active : styles.inactive
              }
            >
              {val.name}
            </button>
          </a>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.messages}>
          {messages.map((val, key) => (
            <div key={key} className={styles.message}>
              <img
                className={styles.avatar}
                src={
                  user.avatar ||
                  "https://cdn.discordapp.com/embed/avatars/0.png"
                }
                alt="profile picture"
                height="42px"
              ></img>
              <div>
                <div className={styles.username}>
                  {server.users.find((user) => user._id == val.author).name}
                </div>
                <div>{val.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.textbox}>
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button
            onClick={() => {
              fetch("http://localhost:3000/messages", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: message,
                  author: localStorage.getItem("id"),
                  server: server._id,
                }),
              }).then((res) => {
                setMessage("");
                res.json().then((msg) => {
                  setMessages([...messages, msg]);
                });
              });
            }}
          >
            send
          </button>
        </div>
      </div>
    </>
  );
};

export default Channel;
