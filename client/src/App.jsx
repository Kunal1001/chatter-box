import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Room from "./components/Room";
import SideNav from "./components/SideNav";
import UserForm from "./components/UserForm";
// const App = () => {




//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ height: 500 }} />
//       <Typography variant="h6" component="div" gutterBottom>
//         {socketID}
//       </Typography>

//       <form onSubmit={joinRoomHandler}>
//         <h5>Join Room</h5>
//         <TextField
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           id="outlined-basic"
//           label="Room Name"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Join
//         </Button>
//       </form>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           id="outlined-basic"
//           label="Message"
//           variant="outlined"
//         />
//         <TextField
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           id="outlined-basic"
//           label="Room"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Send
//         </Button>
//       </form>

//       <Stack>
//         {messages.map((m, i) => (
//           <Typography key={i} variant="h6" component="div" gutterBottom>
//             {m}
//           </Typography>
//         ))}
//       </Stack>
//     </Container>
//   );
// };

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
