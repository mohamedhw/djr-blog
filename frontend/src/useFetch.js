import { useState, useEffect } from "react";
import axios from 'axios';


export const useFetch = (url) => {
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
    }, [])

    return {data, handleErr, isLoading}
}


export const useFetchPost = (url, data) => {

    useEffect(()=>{
        axios.post(url, data, {'content-type': 'application/json'})
        .then(response => {
            console.log(response.data)
        })
        .catch(err =>{
            console.log(err) 
        })
    }, [])

}
