import {useState} from 'react';
import CSRFToken from '../component/CSRFToken'
import { register } from '../redux/action/auth';
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = ({register, isAuthenticated}) => {    
    const [accountCreated, setAccountCreated] = useState(false)
    const [username, setUsername]=useState()
    const [password, setPassword]=useState()
    const [password2, setPassword2] = useState(null)
    const navigate = useNavigate()
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        // let form_data = new FormData();
        // form_data.append('username', username);
        // form_data.append('password', password);
        // form_data.append('password2', password2);
        
        if (password === password2){
            register(username, password, password2)
        }
        else {
            console.log("error password dont match!")
            setAccountCreated(false)
        }
    }
    if (isAuthenticated){
        return navigate('/profile')
     }else if (accountCreated){
       return navigate('/login')
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
                <div className='m-2 form-group'>
                    <label className='form-lapel'>confirm password</label>
                    <input type='password' className="form-control" placeholder="confirm password" onChange={ e => setPassword2(e.target.value)}/>
                </div>

                <button className="btn btn-primary m-2">Register</button>
            </form>
        </div>
    )
}


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated 
})

export default connect(mapStateToProps, {register})(Register);