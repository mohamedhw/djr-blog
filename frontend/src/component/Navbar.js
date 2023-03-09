import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { logout } from "../redux/action/auth";
import { connect } from 'react-redux';

const NavBar = ({logout, isAuthenticated}) => {

    const logedinview = (
        <>
            <Link className="nav-link" aria-current="page" to="/create">Create</Link>
            <Link className="nav-link" aria-current="page" to="/profile">Profile</Link>

            <a className="p-2 nav--link" href="#!" onClick={logout}>Logout</a>
        </>
    )
    const logedoutview = (
        <>
            <Link className="nav-link" aria-current="page" to="/register">Register</Link>
            <Link className="nav-link" aria-current="page" to="/login">Login</Link>
        </>
    )
    return (
        <Navbar bg='dark' variant="dark" className='m-2'>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        { isAuthenticated ? logedinview : logedoutview }
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(NavBar);