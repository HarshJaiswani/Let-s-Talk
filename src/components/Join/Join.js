import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ref = useRef();
  const handleJoin = (e) => {
    if (!name || !room) {
      e.preventDefault();
      alert("Enter Username and Room!");
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-800 w-full h-screen">
      <div
        onKeyDown={(e) => e.key === "Enter" ? handleJoin(e) : ""}
        className="w-[90%] h-[60vh] md:w-1/2 lg:w-1/3 md:h-[40vh] rounded-lg flex flex-col justify-evenly items-center bg-white"
      >
        <h1 className="font-mono font-semibold text-xl text-cyan-600">
          Let's Talk - Join
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="font-mono w-[80%] rounded-md border border-gray-200 outline-none px-2 py-1.5 text-cyan-800 bg-white"
          placeholder="Choose a Username for yourself"
        />
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="font-mono w-[80%] rounded-md border border-gray-200 outline-none px-2 py-1.5 text-cyan-800 bg-white"
          placeholder="Select the Room you want to join"
        />
        <Link
          ref={ref}
          to={`/chat?name=${name}&room=${room}`}
          className="w-[45%] border-none outline-none text-center font-mono tracking-wider text-white px-4 py-1.5 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-md"
          onClick={(e) => handleJoin(e)}
        >
          Join Room
        </Link>
      </div>
    </div>
  );
};

export default Join;
