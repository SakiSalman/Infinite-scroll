import { useEffect, useRef, useState } from "react"
import getPost from "./getPosts"

const useGetPosts = (pageParam = 1) => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)

    console.log(pageParam);

    useEffect( () => {
        // set loading true
        // set error {}
        // is error alse
        setIsLoading(true)
        setIsError(false)
        setError({})
        // abort all observation 
        const controller = new AbortController()
        const {signal} = controller
        getPost(pageParam, {signal})
        .then(data => {
            setIsLoading(false)

            setPosts(prev=> [...prev, ...data])
            setHasNextPage(Boolean(data.length))
               

        })
        .catch(e => {
            setIsLoading(false)
            if (signal.aborted) return
            setIsError(true)
            setError({message : e.target.message})
        })

        // return all revious observation
        return () => controller.abort()


    }, [pageParam])


    return {isLoading, isError, error, posts, hasNextPage}
}


export default useGetPosts