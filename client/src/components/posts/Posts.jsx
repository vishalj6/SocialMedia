import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";

const Posts = ({ userId }) => {
  //TEMPORARY
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
          ? "loading"
          : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
