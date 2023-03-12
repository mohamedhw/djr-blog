import axios from "axios"
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import process from "process";
import {connect} from "react-redux"
import {useParams} from 'react-router-dom'


const Comment = ({username}) => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState()
    const [comments, setComments] = useState(null)
    const [posted, setPosted] = useState(false)

    const handelSubmit = (e) => {
        e.preventDefault();
        const post = postId
        console.log(post)
        let data = new FormData();
        data.append("post", Number(post))
        data.append("author", Number(username))
        data.append("comment", comment)
        console.log(data)
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }
        
        axios.post(`${process.env.REACT_APP_API_URL}/api-add-comment/`, data, config)
        .then(()=>{
            setPosted(true)
        })
        .catch(err =>{
            console.log(err.message); 
        })
    }

    useEffect(() => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }
        axios.get(`http://localhost:8000/api-comments/${postId}/`, config)
        .then((res) => {
            setComments(res.data)
        })
        .catch(err =>{
            console.log(err.message);
        })
    }, [posted]);

    return (
            <div className="mb-4">
                <form onSubmit={handelSubmit} className="form-group m-3 p-3">
                    <input style={{width: "100%"}} className="p-3 form-control" type="text" name="comment" placeholder="comment" onChange={e => setComment(e.target.value)}/>
                    <button type="submit" className="btn btn-primary m-3">Comment</button>
                </form>
                { comments && <div>

                    {comments.map((comment)=>(
                        <div>
                            <div className="row mt-3 p-3 card">
                                <div className="col-md-12 m-2">
                                    <div className="row">
                                        <div className="col-md-1">
                                            <img class="author-img" src={comment.author_image}/>
                                        </div>
                                        <div className="col-md-9">
                                            <h5>{comment.author_username}</h5>
                                            <small>{comment.date}</small>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="col-md-12 mt-3 mx-5">
                                    {comment.comment}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                }
            </div>

    )
}

const mapStateToProps = state => ({
    username: state.profile.user
})

export default connect(mapStateToProps,{} )(Comment)