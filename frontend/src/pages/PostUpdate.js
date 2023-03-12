import { useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const PostUpdate = ({username_g}) => {


    const user_g =  username_g
    const {postId} = useParams()
    console.log(postId)
    const [title, setTitle]=useState()
    const [body, setBody]=useState()
    const [image, setImage] = useState(null)
    const [handleErr, setErr] = useState(null)
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('author', user_g)
        form_data.append('title', title);
        form_data.append('body', body);
        form_data.append('image', image);
        const config = {     
            headers: { 'content-type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken') }
        }
        axios.put(`http://localhost:8000/api-post-update/${postId}/`, form_data, config)
        .then(()=>{
            setErr(null);
            navigate('/:postId')
        })
        .catch(err =>{
            setErr(err.message); 
        })
    }
    return (
        <div>
            {handleErr && {handleErr}}
            <form className='p-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">title</label>
                    <input className="form-control" type='text' placeholder='title' onChange={e=>{setTitle(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">body</label>
                    <textarea className="form-control" placeholder='title' onChange={e=>{setBody(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">image</label>
                    <input type='file' className="form-control" accept="image/png, image/jpeg" onChange={e=>{setImage(e.target.files[0])}}/>
                </div>
                <button className='btn btn-primary'>Post</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    username_g: state.profile.user
})

export default connect(mapStateToProps, {}) (PostUpdate);