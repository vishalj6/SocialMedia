import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "Shivam Patel",
      userId: 1,
      profilePic:
        "https://images.pexels.com/lib/avatars/orange.png?w=50&h=50&fit=crop&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/57901/pexels-photo-57901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      name: "Virat",
      userId: 3,
      profilePic:
        "https://images.pexels.com/photos/12728679/pexels-photo-12728679.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://images.pexels.com/photos/16376255/pexels-photo-16376255/free-photo-of-trees-and-taj-mahal-palace-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Ajay Odedara",
      userId: 4,
      profilePic:
        "https://images.pexels.com/photos/7104962/pexels-photo-7104962.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://images.pexels.com/photos/12125477/pexels-photo-12125477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return <div className="posts">
    {posts.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>;
};

export default Posts;
