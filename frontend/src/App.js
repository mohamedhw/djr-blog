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

function App() {
  return (
    <div className="App container">
      <LayOut>
          <NavBar/>
          <Routes>
            <Route element={<PrivetRoute/>}>
              <Route path='/:postId' element={<Detail />} />
              <Route path='/create' element={<CreatePost />} />
            </Route>
              <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route exact path='/' element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </LayOut>
    </div>
  );
}

export default App;
