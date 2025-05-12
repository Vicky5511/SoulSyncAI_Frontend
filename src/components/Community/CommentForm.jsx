// // src/components/CommentForm.js
// import React, { useState } from 'react';

// const CommentForm = ({ onAddComment }) => {
//   const [comment, setComment] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim()) {
//       onAddComment(comment);
//       setComment('');
//     }
//   };

//   return (
//     <div className="comment-form">
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Add a comment..."
//         rows="3"
//       />
//       <button onClick={handleSubmit}>Comment</button>
//     </div>
//   );
// };

// export default CommentForm;


"use client"

import { useState } from "react"
import "../../styles/CommentForm.css"

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      onAddComment(comment)
      setComment("")
    }
  }

  return (
    <div className="comment-form">
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." rows="3" />
      <button onClick={handleSubmit}>Comment</button>
    </div>
  )
}

export default CommentForm
