import { useState, useEffect } from "react"
import {useFetch} from "../useFetch"
import {Link} from 'react-router-dom'
import axios from "axios"
import Cookies from 'js-cookie'


const Home = ({q}) => {
    // const {data:posts} = useFetch('http://localhost:8000/api-post/')

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [handleErr, setErr] = useState(null)
    const url = q? `http://localhost:8000/api-post/?q=${q}` : `http://localhost:8000/api-post/`

    useEffect(() => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            }
        }
        axios.get(url, config)
        .then((res) => {
            setData(res.data)
            setLoading(false);
            setErr(null);
        })
        .catch(err =>{
            setLoading(false);
            setErr(err.message);
        })
    }, [q]);

    return (
        <div>
            {handleErr && {handleErr}}
            {isLoading && <h1>Loading...</h1>}
            { data &&  <div  className=''>
                            {data.map((post) => (
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