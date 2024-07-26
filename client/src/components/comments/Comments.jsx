import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  const [commentliked, setCommentLiked] = useState({ liked: false, id: null });
  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
          ? "loading"
          : data.map((comment, index) => (
            <div className="comment" key={index}>
              <Link to={`/profile/${comment.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={"/upload/" + comment.profilePic} alt="" />
              </Link>
              <div className="info" onDoubleClick={() => setCommentLiked((prev) => ({ liked: !prev.liked, id: comment.id }))}>
                <div>
                  <span> {comment.name} </span> {comment.desc}
                  <p className="date">1 hour ago</p>
                </div>
              </div>
              <div onClick={() => setCommentLiked((prev) => ({ liked: !prev.liked, id: comment.id }))}>
                {
                  commentliked && commentliked.id === comment.id ? <FavoriteOutlinedIcon style={{ fontSize: "16px", color: "red" }} /> : <FavoriteBorderOutlinedIcon style={{ fontSize: "16px" }} />
                }
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
