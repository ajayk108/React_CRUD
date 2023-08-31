
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function EditPost(){
    const { postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({
        title:"",
        description:""
    });

    const handleInput = (e) =>{
      e.persist();
      setPost({...post, [e.target.name]:e.target.value });
  }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/posts/${postId}`)
        .then((res)=>{           
            setPost(res.data.post);                        
            setLoading(false);           
        })
        
        .catch(error => {
            console.error("Error fetching data:", error);
            setLoading(false); // Even if there's an error, stop loading
        });
    }, [postId]);

    const updatePost = (e) =>{
      e.preventDefault();

      setLoading(true);
      const data = {
          title:post.title,
          description:post.description
      }
      axios.put(`http://localhost:8000/api/posts/${postId}`, data)
      .then(res=>{
          alert(res.data.message);
          setLoading(false);
      })
      .catch(error => {
          // Handle error if necessary
      });

  }
  

    if (loading) {
        return <Spinner />;
      }


    return(
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>
                  Posts
                  <Link className="btn btn-secondary float-end" to="/posts">Back</Link>
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={updatePost}>
                    <div className="mb-3">
                        <label>Title</label>
                        <input type="text" name="title" value={post.title} onChange={handleInput}  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <input type="text" name="description" value={post.description} onChange={handleInput} className="form-control"  />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditPost;