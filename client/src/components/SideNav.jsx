import {React} from "react";
import NavRoom from "./NavRoom";

function SideNav(props){


    return (
    <div className="side-nav">
        <h1>Chat Rooms</h1>
        <div className="nav-container scroll">
            {props.roomList.map((item, index)=>(
                <NavRoom key={index} roomName={item} selectRoom={props.selectRoom}/>
            ))
            }
        </div>
        <button className='create-room' onClick={()=>{
            var room = window.prompt('Enter Room name')
            if(room.trim() !== "") {
                props.createRoom(room)
            } else {
                window.alert('Invalid Room name')
            }
        }}><span>
            Create new room</span></button>

    </div>);
}

export default SideNav;