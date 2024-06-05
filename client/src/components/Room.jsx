import React from "react";
import Chats from "./Chats";
import TextBox from "./TextBox";

function Room(props){
    if(props.roomName === 'No Room Selected')
    {
        return (
        <div className="room">
            <h2>{props.roomName}</h2>

        </div>
        );
    } else {
        return (
            <div className="room">
                <h2>{props.roomName}</h2><hr />
                <Chats roomName={props.roomName} user={props.user} messages={props.messages} userId={props.userId}/><hr />
                <TextBox sendMessage={props.sendMessage}/>
            </div>
            );
    }
}

export default Room;