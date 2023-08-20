import axios from "axios"
const getPost = async (pageParam=1, options) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}`, {options})
    return response.data
}


export default getPost