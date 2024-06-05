import {React, useEffect, useRef} from "react";
import IndividualChat from "./IndividualChat";


function Chats(props){


    const left = 'senders';
    const right = 'users' 

    return (
        <div className="chats scroll chat-container">
            {
                props.messages.map((item, index)=>(
                    item.room === props.roomName?<IndividualChat className={item.userId === props.userId?right:left} key={index} text={item.message} user={item.user}/>:null
                ))
            }
            
        </div>
    )

}

export default Chats;