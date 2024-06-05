import {React, useState} from "react";

function TextBox(props){

    const [inputText, setInputText] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    return (
        <div className="form container">
            <textarea onChange={handleChange} type="text" value={inputText} />
            <button
                onClick={() => {
                    if(inputText.trim() !== "") props.sendMessage(inputText.trim())
                    setInputText("");
                }}
            >
                <span>Send</span>
            </button>
        </div>
    );

}

export default TextBox;