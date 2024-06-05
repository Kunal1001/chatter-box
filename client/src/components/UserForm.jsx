import {React, useState} from "react";

function UserForm(props){

    const [userName, setUserName] = useState('')

    function handleChange(e){
        setUserName(e.target.value)
    }

    return (
        <div className="user-form">
            <label htmlFor="username">Enter User Name</label>
            <input type="text" name="username" onChange={handleChange} value={userName}/>
            <button onClick={()=>{
                props.setUser(userName)
            }}>
                <span>Submit</span>
            </button>
        </div>
    )
}

export default UserForm;