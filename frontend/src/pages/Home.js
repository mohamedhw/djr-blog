import React, {useContext} from "react"
import { Link } from "react-router-dom"
import useFetch from "../useFetch"


const Home = () => {
    const {data:posts, isLoading, handleError} = useFetch('http://localhost:8000/api-post/')


    return (
        <div>
            {handleError && {handleError}}
            {isLoading && <h1>Loading...</h1>}
            { posts &&  <div  className='row'>
                            {posts.map((post) => (
                                <Link className="col-md-3 m-2" key={post.id} to={`/${post.id}`}>
                                    <div className="card" style={{width: "18rem", height: "8rem"}}>
                                        <div className="card-body">
                                            <h5 className="card-title mb-4">{post.title}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{post.body.substring(0, 50)}...</h6>
                                            {/* <p className="card-text">{post.body}</p> */}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>}
        </div>
    )
}

export default Home