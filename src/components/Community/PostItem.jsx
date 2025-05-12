"use client"

import { useState } from "react"
import CommentForm from "./CommentForm"
import "../../styles/Postitem.css"
import "../../styles/CommentForm.css"
import api from "../../api"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa';

const PostItem = ({ post, onLike, onShare, onDelete, onCommentSubmit, onCommentDelete }) => {
  const [likes, setLikes] = useState(post.likes || 0)
  const [shared, setShared] = useState(post.shared || false)
  const [comments, setComments] = useState(post.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await api.post(`http://127.0.0.1:8000/api/like/${post.id}/`)

      const { likes, liked } = response.data
      console.log(liked)
      setLikes(likes)
      setHasLiked(liked)
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const [showBox, setShowBox] = useState(false); // this shows/hides share options
  const postUrl = `${window.location.origin}/post/${post.id}`;
  const shareText = "Check out this post on our community page!";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
    setShowBox(false);
  };

  const handleDelete = () => {
    onDelete(post.id)
  }

  const handleAddComment = (comment) => {
    onCommentSubmit(post.id, comment)
  }

  const handleDeleteComment = (commentId) => {
    onCommentDelete(commentId)
  }

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(date).toLocaleDateString(undefined, options)
  }

  return (
    <div className="post-item">
      <p className="post-user">{post.user}</p>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button className={`like-button ${hasLiked ? "liked" : ""}`} onClick={handleLike}>
          👍 {likes} {hasLiked ? "Liked" : "Like"}
        </button>

        {/* <button className="share-button" onClick={handleShare}>
          {shared ? "✓ Shared" : "↗ Share"}
        </button> */}
<div style={{ position: 'relative', display: 'inline-block' }}
 onMouseEnter={() => setShowBox(true)}    // 👈 Show when hover
 onMouseLeave={() => setShowBox(false)}   // 👈 Hide when mouse leaves

>
<button className="share-button" >
        Share
      </button>
  {/* Share Options Box */}
  {showBox && (
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '0',
          padding: '10px',
          // borderRadius: '5px',
          zIndex: 999,
          // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          display: 'flex',              // 👈 Makes children align in a row
          flexDirection: 'row',         // 👈 Horizontal layout
          gap: '5px'
        }}>
          <button style={{ height: "45px" }} onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank')}>
  <FaFacebook style={{ marginRight: '5px' }} /> Facebook
</button>

<button style={{ height: "45px" }} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')}>
  <FaTwitter style={{ marginRight: '5px' }} /> Twitter
</button>

<button style={{ height: "45px" }} onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank')}>
  <FaLinkedin style={{ marginRight: '5px' }} /> LinkedIn
</button>

<button style={{ height: "45px" }} onClick={() => alert("Instagram sharing is not supported directly. You can paste the link in your story or bio.")}>
  <FaInstagram style={{ marginRight: '5px' }} /> Instagram
</button>

<button style={{ height: "45px" }} onClick={copyToClipboard}>
  <FaLink style={{ marginRight: '5px' }} /> Copy Link
</button>

        </div>
      )}

</div>

        <button className="comment-button" onClick={() => setShowComments(!showComments)}>
          {showComments ? "↑ Hide Comments" : "↓ Show Comments"}
        </button>
        <button className="delete-button" onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>
      <div className="post-date">
        <strong>{formatDate(post.date)}</strong>
      </div>

      {showComments && (
        <div className="comments-section">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.user}</p>
                <p>{comment.content}</p>
                <button className="delete-comment-button" onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
          <CommentForm onAddComment={handleAddComment} />
        </div>
      )}
    </div>
  )
}

export default PostItem
