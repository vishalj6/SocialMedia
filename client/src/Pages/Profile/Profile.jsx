import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import Update from "../../components/update/Update.jsx";


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : error ? ("error" + error) : (
        <>
          <div className="images">
            <img
              src={data?.coverPic ? ("/upload/" + data.coverPic) : "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              alt=""
              className="cover"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="profilebtn">
                <img
                  src={"/upload/" + data.profilePic}
                  alt=""
                  className="profilePic"
                />
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}

                <div className="last">
                  <EmailOutlinedIcon />
                  <MoreVertIcon />
                </div>
              </div>

              <div className="name">
                <h2>Vishal Jadeja</h2>
                <div className="right">
                  <a href="http://facebook.com">
                    <FacebookTwoToneIcon fontSize="large" />
                  </a>
                  <a href="http://instagram.com">
                    <InstagramIcon fontSize="large" />
                  </a>
                  <a href="http://twitter.com">
                    <TwitterIcon fontSize="large" />
                  </a>
                  <a href="http://linkedin.com">
                    <LinkedInIcon fontSize="large" />
                  </a>
                  <a href="http://pinterest.com">
                    <PinterestIcon fontSize="large" />
                  </a>
                </div>
              </div>

              <div className="bio">
                <p>This is my bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt recusandae libero quas, cumque itaque laudantium sunt quisquam, incidunt vel tenetur quaerat numquam in commodi provident non inventore, debitis obcaecati eveniet.</p>
              </div>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>India</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>English</span>
                </div>
              </div>

            </div>
            <Posts />
          </div>
          {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
        </>
      )}
    </div>
  );
};

export default Profile;
