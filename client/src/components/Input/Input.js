import React, {useState} from "react";
import Picker from 'react-emojipicker'
import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
    const [emojies, setEmojies]= useState(false)
   const onEmojiClick = (emojiObject) => {
        setMessage(message+emojiObject.unicode)
    }
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onKeyPress={event =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        onChange={event => setMessage(event.target.value)}
      />
     <div>
     <img src={require('../../Icons/emojie.png')} style={{width: 40, height:40, margin:'auto'}} onClick={()=>setEmojies(!emojies)}/>
      <Picker visible={emojies} modal={true} onEmojiSelected={onEmojiClick}/>
     </div>
      
      <button
        className="sendButton"
        onClick={event => sendMessage(event)}
      >
          Send
      </button>
    </form>
  );
};

export default Input;
