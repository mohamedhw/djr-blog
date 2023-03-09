import { Link } from "react-router-dom"
import {useFetch} from "../useFetch"



const Home = () => {
    const {data:posts, isLoading, handleError} = useFetch('http://localhost:8000/api-post/')

    return (
        <div>
            {handleError && {handleError}}
            {isLoading && <h1>Loading...</h1>}
            { posts &&  <div  className=''>
                            {posts.map((post) => (
                                <div key={post.id} className='row mt-3'>
                                    <div className="col-lg-1"></div>
                                    <Link className="col-lg-10" to={`/${post.id}`}>
                                        <div className="card" style={{width: "auto", height: "10rem"}}>
                                            <div className="card-body">
                                                <h5 className="card-title mb-4">{post.title}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{ post.body.length > 50 ? post.body.substring(0, 200)+'...' : post.body}</h6>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="col-lg-1"></div>
                                </div>
 
                            ))}
                        </div>}
        </div>
    )
}

export default Home