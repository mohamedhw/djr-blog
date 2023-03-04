import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {

    return (
        <Navbar bg='dark' variant="dark" className='m-2'>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default NavBar