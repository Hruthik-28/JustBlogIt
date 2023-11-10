import {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '' ,
            slug: post?.slug || '' ,
            content: post?.content || '' ,
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)

    const submit = async (data) => {

        if (post) {
            const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            // console.log("dbPost", dbPost);
            if(file && dbPost) await appwriteService.deleteFile(post.featuredImage)

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null

            if (file) {
                data.featuredImage = file.$id
                
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/\s/g, '-')
        }

        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className='flex sm:flex-row flex-col'>
            <div className='sm:w-2/3 px-2'>
                <Input
                    label='Title: '
                    placeholder='Title'
                    className='mb-4'
                    {...register('title', {required: true})}
                />
                <Input 
                    label='Slug: '
                    placeholder='Slug'
                    className='mb-4'
                    {...register('slug', {required: true})}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value, {
                        shouldValidate: true
                    }))}
                />
                <RTE label="Content: " name="content" control={control} defaultValues={getValues("content")}/>
            </div>
            <div className="sm:w-1/3 px-2">
                <Input 
                    label='Featured Image: '
                    type='file'
                    className='mb-4'
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('featuredImage', {required: !post})}
                />
                {
                    post && (
                        <div className="w-full mb-4">
                            <img 
                                src={appwriteService.getFilePreview(post.featuredImage)} 
                                alt={post.title} 
                                className='rounded-lg'
                            />
                        </div>
                    )
                }
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className='mb-4'
                    {...register("status", {required: true})}
                />
                <Button type='submit' bgColor='bg-primary' className='w-full hover:bg-accent'>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
