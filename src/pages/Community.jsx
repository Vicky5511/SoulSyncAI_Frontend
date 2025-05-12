
"use client"

import { useState, useEffect } from "react"
import PostForm from "../components/Community/PostForm"
import PostList from "../components/Community/PostList"
import "../styles/Community.css"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import api from "../api"

const Community = () => {
  const username = localStorage.getItem("username") || "Guest"
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)

const [viewMyPosts, setViewMyPosts] = useState(false)

  const fetchUserPosts = async () => {
  try {
    const response = await api.get("http://127.0.0.1:8000/api/posts/user/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Optional, only if using JWT
      },
    })

    const userPosts = response.data.map((post) => ({
      id: post.id,
      user: post.user,
      content: post.content,
      likes: post.likes?.length || 0,
      shared: false,
      comments: post.comments?.map((comment) => ({
        id: comment.id,
        content: comment.content,
        user: comment.user,
        date: new Date(comment.created_at),
      })) || [],
      date: new Date(post.created_at),
    }))

    setPosts(userPosts)
  } catch (error) {
    console.error("Error fetching user posts:", error)
  }
}

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const url = viewMyPosts
        ? "http://127.0.0.1:8000/api/posts/user/"
        : "http://127.0.0.1:8000/api/post/"
      
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Only if using JWT
        },
      })

      const fetchedPosts = response.data.map((post) => ({
        id: post.id,
        user: post.user,
        content: post.content,
        likes: post.likes?.length || 0,
        shared: false,
        comments: post.comments?.map((comment) => ({
          id: comment.id,
          content: comment.content,
          user: comment.user,
          date: new Date(comment.created_at),
        })) || [],
        date: new Date(post.created_at),
      }))
      
      setPosts(fetchedPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  fetchPosts()
}, [viewMyPosts])



  // Handle adding a new post
  const handleAddPost = async (content) => {
    try {
      const newPostData = {
        user: username,
        content: content,
      }

      const response = await api.post("http://127.0.0.1:8000/api/post/", newPostData)
      console.log(response.data)
      const createdPost = {
        id: response.data.id,
        user: response.data.user,
        content: response.data.content,
        likes: 0,
        shared: false,
        comments: [],
        date: new Date(response.data.created_at),
      }
      setPosts([createdPost, ...posts])
      setShow(false) // Hide the form after posting
    } catch (error) {
      console.error("Error adding post:", error)
    }
  }

  // Handle liking a post
  const handleLikePost = async (postId) => {
    try {
      const response = await api.post(`api/like/${postId}/`)
      setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: response.data.likes } : post)))
    } catch (error) {
      console.error("Error liking the post:", error)
    }
  }

  // Handle sharing a post
  const handleSharePost = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, shared: true } : post)))
  }

  // Handle deleting a post
  const deletePost = async (postId) => {
    try {
      await api.delete(`http://127.0.0.1:8000/api/post/${postId}/`)
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  // Handle submitting a comment
  const handleCommentSubmit = async (postId, content) => {
    try {
      const response = await api.post(`http://127.0.0.1:8000/api/posts/${postId}/comments/`, {
        content: content,
        user: username,
      })

      const newComment = {
        id: response.data.id,
        postId: postId,
        user: username,
        content: response.data.content,
        date: new Date(response.data.created_at),
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return { ...post, comments: [...post.comments, newComment] }
          }
          return post
        }),
      )
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  // Handle deleting a comment
  const handleCommentDelete = async (commentId) => {
    try {
      await api.delete(`http://127.0.0.1:8000/api/comments/${commentId}/`)
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
        })),
      )
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

return (
  <div>
    <Navbar />
    <div className="community-page">
      <div className="community-header">
        <h1 className="community-title">Community Feed</h1>
        <div>
          <button className="create-post-btn" onClick={() => setShow(!show)}>
            {show ? "Cancel" : "Create New Post"}
          </button>
          <button
          style={{ marginLeft: "10px" }}
            className="create-post-btn"
            onClick={() => setViewMyPosts((prev) => !prev)}
          >
            {viewMyPosts ? "View All Posts" : "View My Posts"}
          </button>
        </div>
      </div>

      {/* Optional subtitle */}
      <h4 style={{ marginTop: "10px" }}>
        {viewMyPosts ? "Your Posts" : "All Community Posts"}
      </h4>

      {show && <PostForm onAddPost={handleAddPost} />}

      <PostList
        posts={posts}
        onLike={handleLikePost}
        onShare={handleSharePost}
        onDelete={deletePost}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
      />
    </div>
  </div>
)

}

export default Community
