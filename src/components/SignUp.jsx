import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import {Button, Input, Logo} from './index'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState()

    const signUp = async(data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            // console.log(session);
            if (session) {
                // console.log("session", session);
                const userData = await authService.getCurrentUser()
                if (userData) {
                    // console.log("userData", userData);
                    dispatch(storeLogin(userData))
                    navigate('/')
                }
                
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/> 
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold'>
                    Sign up to create an account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Login
                    </Link>
                </p>
                {
                    error && 
                    <p className='text-red mt-8 text-center'>
                        {error}
                    </p>
                }
                <form onSubmit={handleSubmit(signUp)}
                className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                            label='Name: '
                            placeholder='Enter your name'
                            type='text'
                            {...register('name', {
                                required: true
                            })}
                        />
                        <Input 
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || setError('Please enter a valid email')
                                }
                            })}
                        />
                        <Input 
                            label='Password: '
                            placeholder='Enter your password'
                            type='password'
                            {...register('password', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || setError('Password must have atleast one uppercase and number')
                                }
                            })}
                        />
                        <Button
                            bgColor='bg-primary'
                            type='submit' 
                            className='w-full hover:bg-text hover:text-background'
                        >
                            SignUp
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
