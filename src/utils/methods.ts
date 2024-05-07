import { CommentType } from "../commentData"

type replyMsgPropType = {
    tree:CommentType[],
    userName:string,
    message:string,
}

export function addRepliesUsingUsername({tree,userName,message}:replyMsgPropType):CommentType[]{

    const updatedTree = tree?.map((ele) => {
        if(ele.userName === userName){
            return {...ele, replies:[...ele.replies, {userName:`user${Math.trunc(Math.random()*10)+Date.now()}`,message,replies:[]}]};
        }else{
            const {replies} = ele;
            const updatedReplies = addRepliesUsingUsername({tree:replies, userName,message});
            return {...ele, replies:updatedReplies};
        }
    })
    return updatedTree;
}
export function deleteRepliesUsingUsername({tree,userName}:{tree:CommentType[],userName:string}):CommentType[]{
    
    const updatedTree = tree?.filter((ele) => {
        if(ele.userName !== userName){
            ele.replies = deleteRepliesUsingUsername({tree:ele.replies, userName});
            return true;
        }
    })
    return updatedTree;

}