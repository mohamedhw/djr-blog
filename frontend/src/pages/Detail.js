import { useFetch } from "../useFetch"
import { useParams, Link } from "react-router-dom"
import {connect} from 'react-redux'
import Comment from "./comments"
import { format } from 'date-fns'

const Detail = ({username_g}) => {
    const {postId} = useParams()
    const {data:post, isLoading, handleError} = useFetch(`http://localhost:8000/api-post/${postId}/`)
    const logedin_view = (
        <div className="col-md-4">
            <Link className="btn btn-primary m-1" to={`/post-update/${postId}`}>Update</Link>
            <Link className="btn btn-danger m-1" to={`/post-delete/${postId}`}>Delete</Link>
        </div>
    )
    return (
        <div>
            {handleError && {handleError}}
            {isLoading && <h1>Loading...</h1>}
            {post && 
                <div>
                    <div className="p-5 card">
                        <div className="row">
                            <div className="col-md-1">
                                <img class="author-img" src={post.author_image}/>
                            </div>
                            <div className="col-md-2">
                                <h5>{post.author_name}</h5>
                                <small>{post.date}</small>
                            </div>
                            {username_g===post.author_name ? logedin_view : <></>}
                        </div>
                        <hr></hr>
                        <h1 className="m-2">{post.title}</h1>
                        <div>
                            <img alt='profile pic' style={{width: '100%'}} src={post.image}/>
                        </div>
                        <p className="m-3 p-2">{post.body}</p>
                    </div>
                    <hr></hr>
                    <h2>Comment</h2>
                    <div>
                        <Comment post={post.id}/>
                    </div>

                </div>
            }
        </div>
    )
}


const mapStateToProps = state => ({
    username_g : state.profile.username,
})

export default connect(mapStateToProps,{})(Detail)