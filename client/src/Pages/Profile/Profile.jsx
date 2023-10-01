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

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="profilebtn">
            <img
              src="https://pbs.twimg.com/profile_images/1279347647891959809/yZ9aMXnd_400x400.jpg"
              alt=""
              className="profilePic"
            />
            <button>follow</button>

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
    </div>
  );
};

export default Profile;
