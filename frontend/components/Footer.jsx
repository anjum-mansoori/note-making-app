import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <h3>Created with ❤️ by Anjum</h3>
            <p>Copyrights &copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
    )
}

export default Footer
