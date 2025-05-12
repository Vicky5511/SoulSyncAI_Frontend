
"use client"

import { useState } from "react"
import "../../styles/PostForm.css"

const PostForm = ({ onAddPost }) => {
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim()) {
      onAddPost(content)
      setContent("")
    }
  }

  return (
    <div className="post-form">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default PostForm
