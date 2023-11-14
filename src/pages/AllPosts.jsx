import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import {PostCard, Skeleton} from '../components/index'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .catch((error) => console.log("Failed to get all posts from appwrite", error))
    }, [])

    if (posts.length == 0) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <Skeleton />
            </div>
        )
    }

    return (
        <div className='w-full py-8 md:pt-10'>
            <div className='w-full max-w-8xl mx-auto px-4'>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 hover:scale-95 transition-all duration-200'>
                            <PostCard post={post}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllPosts
