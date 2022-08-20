import React, { useState, useEffect } from "react";
import querryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { HiPaperAirplane } from "react-icons/hi";

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    let { name, room } = querryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name.trim().toLowerCase());
    setRoom(room.trim().toUpperCase());

    socket.emit("join", { name, room }, (error) => {
      if (error) alert(error);
    });
    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center">
      <div className="w-full h-[10%] flex justify-center items-center">
        <h1 className="text-3xl font-semibold font-mono text-gray-300">
          Let's Talk - <span className="text-cyan-600">{room}</span>
        </h1>
      </div>
      <ScrollToBottom className="w-[60%] mx-auto h-[70%]">
        <div className="w-full h-full px-4">
          {messages.map((msg,index) => (
          <div key={index} className={`${name === msg.user && "float-right"} ${msg.user === "admin" && "mx-auto"} ${msg.user !== "admin" && msg.user !== name && "float-left"} clear-both my-4 bg-[rgb(241,241,241)]/50 font-mono w-fit mx-w-[50%] rounded-md px-4 py-2`}>
            <span className={`${msg.user === name ? "text-green-500" : "text-red-500"} font-semibold`}>{msg.user} - </span> {msg.text}
          </div>
          ))}
        </div>
      </ScrollToBottom>
      <div className="w-full h-[20%] flex flex-col justify-center items-center">
        <div className="w-[60%] flex items-center justify-center rounded-md border border-[#e2e2e2]">
          <input
            type="text"
            className="w-full px-2 py-1.5 font-mono outline-none rounded-[inherit]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <button
            onClick={(e) => sendMessage(e)}
            className="outline-none border-none px-2 py-1.5 bg-blue-100"
          >
            <HiPaperAirplane className="text-2xl text-blue-500 rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
