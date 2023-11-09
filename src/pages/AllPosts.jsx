import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../components/index'

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

    return (
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-11'>
                            <PostCard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
