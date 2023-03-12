import { connect } from "react-redux";
import CSRFToken from "../component/CSRFToken";
import {useState} from 'react';
import {login} from '../redux/action/auth'
import { useNavigate } from "react-router-dom";


const Login = ({isAuthenticated, login}) => {
    const [username, setUsername]=useState()
    const [password, setPassword]=useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
    }

    if(isAuthenticated){
        navigate('/')
    }
    return (
        <div>
            <form onSubmit={e=>handleSubmit(e)}>
                <CSRFToken/>
                <div className='m-2 form-group'>
                    <label className='form-lapel'>username</label>
                    <input type='text' className="form-control" placeholder="username" onChange={ e => setUsername(e.target.value)}/>
                </div>
                <div className='m-2 form-group'>
                    <label className='form-lapel'>password</label>
                    <input type='password' className="form-control" placeholder="password" onChange={ e => setPassword(e.target.value)}/>
                </div>                

                <button className="btn btn-primary m-2">Login</button>
            </form>
        </div>
    )
}



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated 
})

export default connect(mapStateToProps, {login})(Login);