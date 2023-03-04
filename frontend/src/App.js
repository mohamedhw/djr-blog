import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import NavBar from './component/Navbar';
import { FeatchProvider, FeatchContext } from './context';
import './index.css'

function App() {
  return (
    <div className="App container">
      <FeatchProvider>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:postId' element={<Detail/>}/>
        </Routes>
      </FeatchProvider>
    </div>
  );
}

export default App;
