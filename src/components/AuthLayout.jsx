import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authenctication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState()
    const authStatus = useSelector(state => state.status)

    useEffect(() => {
        // TODO MAKE IT MORE EASY 
        // if (authStatus === true) {
        //     navigate('/')
        // } else if (authStatus === false) {
        //     navigate('/login')
        // }

        if (authenctication && authStatus !== authenctication) {
            navigate('/login')
        } else if(!authenctication && authStatus !== authenctication){
            navigate('/')
        }

        setLoader(false)
    }, [authStatus, navigate, authenctication])
    return loader ? <h1>Loading ...</h1> : children
}

