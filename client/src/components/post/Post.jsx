import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import moment from 'moment'

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const [descopen, setDescopen] = useState(false);

  //TEMPORARY
  // let liked = false;

  return (
    <>
      {
        isLoading ? "loading...." : error ? "error" :
          (<div className="post">
            <div className="container">
              <div className="user">
                <div className="userInfo">
                  <img src={"/upload/" + post.profilePic} alt="" />
                  <div className="details">
                    <Link
                      to={`/profile/${post.userId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <span className="name">{post.name}</span>
                    </Link>
                    <span className="date">{moment(post.createdAt).fromNow()}</span>
                  </div>
                </div>
                <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                {menuOpen && post.userId === currentUser.id && (
                  <button onClick={handleDelete}>delete</button>
                )}
              </div>
              <div className="postImg">
                <img src={"/upload/" + post.img} alt="" />
              </div>
              <div className="info">
                <div className="item">
                  {isLoading ? (
                    "loading"
                  ) : data.includes(currentUser.id) ? (
                    <FavoriteOutlinedIcon
                      style={{ fontSize: "28px", color: "red" }}
                      onClick={handleLike}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon style={{ fontSize: "28px" }} onClick={handleLike} />
                  )}
                  {/* 12 Likes */}
                </div>

                <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                  <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "26px" }} />
                  {/* 12 Comments */}
                </div>
                <div className="item">
                  <SendIcon className="sendicon" />
                  Share
                </div>
              </div>
              <div className="content">
                <p>
                  {data?.length ?? 0} likes
                </p>
                <div className="namedesc" style={{ height: descopen ? "auto" : "18px", overflow: "hidden" }}>
                  <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <b>{post.name} </b>
                  </Link>
                  <span onClick={() => setDescopen(!descopen)}>
                    {post.desc}
                  </span>
                </div>
                <p className="viewallcomments" onClick={() => setCommentOpen(!commentOpen)}>View all comments</p>
              </div>
              {commentOpen && <Comments postId={post.id} />}
              {/* <hr /> */}
            </div>
          </div>)
      }
    </>
  );
};

export default Post;
