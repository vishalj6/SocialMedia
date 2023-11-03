import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const [commentliked, setCommentLiked] = useState(true);
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment, index) => (
        <div className="comment" key={index}>
          <Link to={`/profile/${comment.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={comment.profilePicture} alt="" />
          </Link>
          <div className="info" onDoubleClick={() => setCommentLiked(!commentliked)}>
            <div>
              <span> {comment.name} </span> {comment.desc}
              <p className="date">1 hour ago</p>
            </div>
          </div>
          {
            commentliked ? <FavoriteOutlinedIcon style={{ fontSize: "16px" }} /> : <FavoriteBorderOutlinedIcon style={{ fontSize: "16px" }} />
          }
        </div>
      ))}
    </div>
  );
};

export default Comments;
