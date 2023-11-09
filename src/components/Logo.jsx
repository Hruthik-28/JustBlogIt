import React from 'react'
import logo from '../assets/572.png'

function Logo({width = '100px'}) {
    return <div className='lg:w-20 md:w-16 sm:w-20'><img src={logo} width={width} alt="Logo"/></div>
}

export default Logo
