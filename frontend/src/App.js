import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import NavBar from './component/Navbar';
import './index.css'
import CreatePost from './pages/Create';
import Login from './pages/Login';
import Register from './pages/Register';
import LayOut from './Layout';
import PrivetRoute from './PrivetRoute';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PostUpdate from './pages/PostUpdate';
import PostDelete from './pages/PostDelete';
import { useState } from 'react';

function App() {

  const [q, setQ] = useState(null)

  return (
    <div className="App container">
      <LayOut>
          <NavBar setQ={setQ} />
            <Routes>
              <Route element={<PrivetRoute/>}>
                <Route path='/create' element={<CreatePost />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/:postId' element={<Detail />} />
              </Route>
              <Route path='/post-update/:postId' element={<PostUpdate/>}/>
              <Route path='/post-delete/:postId' element={<PostDelete/>}/>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route exact path='/' element={<Home q={q}/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
      </LayOut>
    </div>
  );
}

export default App;
