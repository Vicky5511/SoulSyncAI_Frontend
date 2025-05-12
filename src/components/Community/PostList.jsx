import PostItem from "./PostItem"
import "../../styles/PostList.css"

const PostList = ({ posts, onLike, onShare, onDelete, onCommentSubmit, onCommentDelete }) => {
  return (
    <div className="post-list">
      {/* <h2>Community Posts</h2> */}
      {posts.length > 0 ? (
        [...posts]
          .reverse()
          .map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onLike={onLike}
              onShare={onShare}
              onDelete={onDelete}
              onCommentSubmit={onCommentSubmit}
              onCommentDelete={onCommentDelete}
            />
          ))
      ) : (
        <p>No posts yet. Be the first to share your thoughts!</p>
      )}
    </div>
  )
}

export default PostList
