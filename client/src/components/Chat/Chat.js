import React, { useState, useEffect } from "react";
import queryStrig from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryStrig.parse(location.search);
    // connecting to te server
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // on join the server will do something, also passing data to the server
    socket.emit('join', { name, room });

    // return acts as compomentwillunmount

    return () =>{
      socket.emit('disconnect')
      socket.off();
    }

    // use effect is going to be called whenever the values in the array change
  }, [ENDPOINT, location.search]);
  return <div>Chat</div>;
};

export default Chat;
