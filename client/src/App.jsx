import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Room from "./components/Room";
import SideNav from "./components/SideNav";
import UserForm from "./components/UserForm";


function App(){

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [user, setUser] = useState("anym");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState('No Room Selected')

  function handleSubmit(data){
    socket.emit("message", {user:user, userId:socketID, message:data, room:roomName });
    setMessages([ ...messages, {user:user, userId:socketID, message:data, room:roomName}])
  };

  function createRoom(room){
    socket.emit('create-room',room)
    setRoomList([...roomList, room])
  }

  async function getData(){
    var chatData = await axios.get("http://localhost:3000/data");
    setMessages(chatData.data.data);
    setRoomList(chatData.data.rooms)
  }




  useEffect(() => {
    socket.on("connect", () => {
      console.log("hi");
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on('get-rooms',(room)=>{
      console.log(room);
      setRoomList((roomList)=>[...roomList, room])
    })

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function setUserName(name){
    setUser(name)
  }



  function selectRoom(room){
    socket.emit("join-room", room);
    setRoomName(room)
  }
  if(user === "anym"){
    getData();
    return <UserForm setUser={setUserName} />
  } else {
    return (
      <div className="container">
        <SideNav createRoom={createRoom} roomList={roomList} selectRoom={selectRoom}/>
        <Room roomName={roomName} sendMessage={handleSubmit} user={user} messages={messages} userId={socketID}/>
      </div>
      );
  }
  
}

export default App;
