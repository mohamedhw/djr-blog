import { useState } from "react"
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"


const PostDelete = () => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const handleSubmit=()=>{
        const config = {     
            headers: {"Content-Type": "application/json", 'X-CSRFToken': Cookies.get('csrftoken') }
        }
        axios.delete(`http://localhost:8000/api-post-delete/${postId}/`, config)
        .then(()=>{
            alert('Post Deleted success')
            navigate('/')
        })
        .catch(err =>{
            console.log(err.message); 
        })
    }

    return (
        <div>
            <button onClick={handleSubmit} className="btn btn-danger">Delete</button>
        </div>
    )
}


export default PostDelete;