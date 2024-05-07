import React, { useState } from "react"
import { CommentType } from "../commentData"
import CommentInput from "./CommentInput"

type PropType = {
    userName: CommentType["userName"],
    message: CommentType["message"],
    replies: CommentType["replies"],
    addRepliesHandler: (userName: string, message: string) => void
    deleteRepliesHandler: (userName: string) => void
}

const CommentCard = ({ userName, message, replies, addRepliesHandler, deleteRepliesHandler }: PropType) => {
    const [showReplies, setShowReplies] = useState<boolean>(false);
    const [showReplayInput, setShowReplayInput] = useState<boolean>(false);
    return (
        <>
            {
                !!userName.length &&
                <div style={{ paddingLeft: "4rem", display: "flex", flexDirection: "column", gap: "7px", marginTop: "25px", alignItems: "start" }}>
                    <span style={{ display: "inline", background: "#888", fontSize: "16px", fontWeight: "600" }}>{userName}</span>
                    <p>{message}</p>
                    {
                        showReplayInput &&
                        <CommentInput
                            userName={userName}
                            addRepliesHandler={addRepliesHandler}
                        />
                    }
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => { setShowReplayInput(prev => !prev) }}>
                            {!showReplayInput ? "add replay" : "cancel"}
                        </button>
                        <button onClick={() => { deleteRepliesHandler(userName) }}>
                            delete
                        </button>
                        {
                            !!replies.length &&
                            <button onClick={() => { setShowReplies(prev => !prev) }}>{showReplies ? "hide" : "show"} replies</button>
                        }
                    </div>
                    {
                        showReplies &&
                        replies.map((replay) => {
                            return (
                                <CommentCard
                                    key={replay.userName}
                                    {...replay}
                                    addRepliesHandler={addRepliesHandler}
                                    deleteRepliesHandler={deleteRepliesHandler}
                                />
                            )
                        })
                    }
                </div>
            }
        </>
    )

}

export default React.memo(CommentCard)