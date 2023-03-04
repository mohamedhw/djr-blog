import { useState, useEffect } from "react";
import axios from 'axios';


const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [handleErr, setErr] = useState(null)
    useEffect(()=>{
        axios.get(url)
        .then(response => {
            setData(response.data)
        })
        .then(() => {
            setLoading(false);
            setErr(null);
        })
        .catch(err =>{
            setLoading(false);
            setErr(err.message);
        })
    }, [url])

    return {data, handleErr, isLoading}
}

export default useFetch