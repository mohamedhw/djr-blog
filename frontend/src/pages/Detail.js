import useFetch from "../useFetch"
import { useParams } from "react-router-dom"

const Detail = () => {
    const {postId} = useParams()
    const {data:post, isLoading, handleError} = useFetch(`http://localhost:8000/api-post/${postId}/`)

    return (
        <div>
            {handleError && {handleError}}
            {isLoading && <h1>Loading...</h1>}
            {post && 
                <div className="detail--post p-5">
                    <h1 className="m-5">{post.title}</h1>
                    <hr></hr>
                    <p className="m-5 p-5">{post.body}</p>
                </div>
            }
        </div>
    )
}

export default Detail