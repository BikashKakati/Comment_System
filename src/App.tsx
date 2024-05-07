import './App.css'
import CommentCard from './components/CommentCard';
import { CommentType, commentsData } from './commentData';
import { useRef, useState } from 'react';
import { addRepliesUsingUsername, deleteRepliesUsingUsername } from './utils/methods';

function App() {
  const msgRef = useRef<HTMLInputElement>(null!);
  const [comments, setComments] = useState<CommentType[]>(commentsData);


  function addCommentHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = msgRef.current.value;
    if(!message){
      alert("empty message found");
      return
    }
    setComments(prev => [...prev, { userName: `user${Math.trunc(Math.random() * 10) + Date.now()}`, message, replies: [] }]);
    const event = e.target as HTMLFormElement;
    event.reset();
  }

  function addRepliesHandler(userName: string, message: string) {
    const updatedComment = addRepliesUsingUsername({ tree: comments, userName, message });
    setComments(updatedComment);
  }
  function deleteRepliesHandler(userName: string) {
    const updatedComment = deleteRepliesUsingUsername({ tree: comments, userName });
    setComments(updatedComment);
  }

  return (
    <div>
      <h1>Comment Box</h1>
      <form
        onSubmit={addCommentHandler}
        style={{ border: "1px solid #333", display: "flex", maxWidth: "30rem", margin: "1rem 0rem", padding: "1rem" }}
      >
        <input type="text" id='comment' placeholder="add comment" ref={msgRef} />
        <input type="submit" value="Comment" />
      </form>
      <div className="">
        {
          comments.map((comment) => {
            return (
              <CommentCard
                key={comment.userName}
                {...comment}
                addRepliesHandler={addRepliesHandler}
                deleteRepliesHandler={deleteRepliesHandler}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default App
