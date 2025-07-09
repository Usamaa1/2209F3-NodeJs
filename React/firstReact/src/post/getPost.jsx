import { useState, useEffect } from 'react'
import axios from 'axios';

export default function GetPost() {

    const [allPosts, setPost] = useState([]);

    const getPost = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/post');
              const {data}  = response;
              setPost(data);
            console.log(response);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPost();
    },[])

    return <>

        <h1>Get Post</h1>
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>

        {allPosts.map((singlePost)=>(

             <div className="container" key={singlePost._id}>
             <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
 
                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{singlePost.title}</h5>
                 <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
             </a>
 
         </div>

        ))}

    </>
}
