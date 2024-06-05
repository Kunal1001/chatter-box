import {React, useEffect, useRef} from "react";

function IndividualChat(props){

    const lastMessage = useRef(null)

    useEffect(()=>{
        lastMessage.current?.scrollIntoView()
    },[props.messages])

    return (
        <div className={'indi-chat '+props.className}>
            <p>{props.user}</p>
            <h3>{props.text}</h3>
            <div ref={lastMessage} />
        </div>
    )

}

export default IndividualChat