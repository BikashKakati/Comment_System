import React, { useRef } from 'react';

type PropType = {
    userName:string,
    addRepliesHandler:(userName:string, message:string)=>void,
}

const CommentInput = ({userName,addRepliesHandler}:PropType) => {

    const msgRef = useRef<HTMLInputElement>(null!);

    function handleReplayAdd(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const message = msgRef.current.value;
        if(!message){
            alert("empty message found");
            return
          }
        addRepliesHandler(userName, message)
        const formElement = e.target as HTMLFormElement
        formElement.reset();
    }
    return (
        <form onSubmit={handleReplayAdd}>
            <input type="text" id='replay' placeholder="replay" ref={msgRef}/>
            <input type="submit" value="Replay" />
        </form>
    )
}

export default CommentInput