import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then((res) => {
      setPosts(res.data.posts);
      setLoading(false);
    });
  }, []);

  const deletePost = (e, id)=>{
    e.preventDefault();
    setLoading(true);
    axios.delete(`http://127.0.0.1:8000/api/posts/${id}`)
    .then(res=>{
      alert(res.data.message);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id)); // Remove deleted post from state
      setLoading(false);
    });

  }


  if (loading) {
    return <Spinner />;
  }

  let PostsList = posts.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>
          <Link className="btn btn-success me-1" to={`/posts/edit/${item.id}`}>Edit</Link>
          <button type="button" onClick={(e)=>deletePost(e, item.id)} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>
                Posts
                <Link className="btn btn-primary float-end" to="/posts/create">Add Posts</Link>
              </h3>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr key="">
                    <th>sr no.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{PostsList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Posts;
