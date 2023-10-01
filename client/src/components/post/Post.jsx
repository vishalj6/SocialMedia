import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setlike] = useState(false);

  //TEMPORARY
  // let liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="postImg">
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={() => setlike(!like)} >
            {like ? <FavoriteOutlinedIcon style={{fontSize:"28px"}} /> : <FavoriteBorderOutlinedIcon style={{fontSize:"28px"}} />}
            {/* 12 Likes */}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <ChatBubbleOutlineOutlinedIcon style={{fontSize:"26px"}}/>
            {/* 12 Comments */}
          </div>
          <div className="item">
            <SendIcon className="sendicon"/>
            Share
          </div>
        </div>
        <div className="content">
          <p>{ 
          like ? 233616 : 233615
          } likes</p>
          <p><Link  to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}> <b>{post.name} </b></Link> {post.desc}</p>
          <p className="viewallcomments"  onClick={() => setCommentOpen(!commentOpen)}>View all comments</p>
          {commentOpen && <Comments />}
        </div>
        {/* <hr /> */}
      </div>
    </div>
  );
};

export default Post;
