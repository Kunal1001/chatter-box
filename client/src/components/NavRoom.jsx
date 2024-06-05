import {React, useRef, useEffect} from "react";

function NavRoom(props){

    const lastRoom = useRef(null);

    useEffect(()=>{
        lastRoom.current?.scrollIntoView()
    }, [props.roomName])

    return (
    <div className="nav-room" onClick={()=>{
        props.selectRoom(props.roomName)
    }}>
        <p>{props.roomName}</p>
        <div ref={lastRoom} />
    </div>);
}

export default NavRoom;