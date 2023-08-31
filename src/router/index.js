import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Posts from '../pages/Posts';
import CreatePost from '../pages/CreatePost'
import EditPost from '../pages/EditPost'

function MyRouter(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<Home/>} ></Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/contact' element={<Contact/>}></Route>
                <Route path='/posts' element={<Posts/>}></Route>
                <Route path='/posts/create' element={<CreatePost/>}></Route>
                <Route path='/posts/edit/:postId' element={<EditPost/>}></Route>
            </Routes>
        </div>       
    );
}

export default MyRouter;