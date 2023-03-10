import { useFetch } from "../useFetch"
import { useParams, Link } from "react-router-dom"
import {connect} from 'react-redux'


const Detail = ({username_g}) => {
    const {postId} = useParams()
    const {data:post, isLoading, handleError} = useFetch(`http://localhost:8000/api-post/${postId}/`)
    const logedin_view = (
        <div>
            <Link className="btn btn-primary m-2" to={`/post-update/${postId}`}>Update</Link>
            <Link className="btn btn-danger m-2" to={`/post-delete/${postId}`}>Delete</Link>
        </div>
    )
    return (
        <div>
            {handleError && {handleError}}
            {isLoading && <h1>Loading...</h1>}
            {post && 
                <div className="detail--post p-5">
                    {username_g===post.author_name ? logedin_view : <></>}
                    <h3>{post.author_name}</h3>
                    <hr></hr>
                    <h1 className="m-5">{post.title}</h1>
                    <small>{post.date}</small>
                    <hr></hr>
                    <div>
                        <img alt='profile pic' style={{width: '1200px'}} src={post.image}/>
                    </div>
                    <p className="m-5 p-5">{post.body}</p>
                </div>
            }
        </div>
    )
}


const mapStateToProps = state => ({
    username_g : state.profile.username
})

export default connect(mapStateToProps,{})(Detail)