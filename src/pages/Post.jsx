import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Skeleton } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) setPost(post)
                else navigate('/')
            })
        }else navigate('/')

    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then(async(status) => {
            if (status) {
                await appwriteService.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

    window.scrollTo(0, 0);

    if (!post) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <Skeleton />
            </div>
        )
    }

    return post ? (
        <div className="py-8">
            <Container >
                <div className="max-w-5xl mb-4 relative rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute sm:right-6 sm:top-6 -bottom-9 right-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-primary" className="mr-3 hover:scale-110 py-1">
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red" 
                                className="hover:scale-110 py-1"
                                onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full text-center sm:text-start sm:pt-2 pt-6">
                    <h1 className="md:text-3xl text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css sm:text-xl text-xs">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post
