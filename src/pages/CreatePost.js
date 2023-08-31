import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function CreatePost(){

    const [post, setPost] = useState({
        title:'',
        description:''
    });


    const handleInput = (e) =>{
        e.persist();
        setPost({...post, [e.target.name]:e.target.value });
    }

    const savePost = (e) =>{
        e.preventDefault();
        const data = {
            title:post.title,
            description:post.description
        }
        axios.post('http://localhost:8000/api/post', data)
        .then(res=>{
            alert(res.data.message);
              setPost({
                title:'',
                description:''
              });
        })
        .catch(error => {
            // Handle error if necessary
        });

        e.target.reset();
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
                <form onSubmit={savePost}>
                    <div className="mb-3">
                        <label>Title</label>
                        <input type="text" name="title" value={post.title} onChange={handleInput} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <input type="text" name="description" value={post.description} onChange={handleInput} className="form-control" />
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

export default CreatePost;