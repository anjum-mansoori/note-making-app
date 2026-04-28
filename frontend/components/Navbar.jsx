import React from 'react'
import './Navbar.css'

const Navbar = ({ search, setSearch, dark, setDark }) => {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <img src="logo.png" alt="note" />
                <h1>My Notes</h1>
            </div>
            <div className="search">
                <div className="searchIcon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" placeholder='Search notes...' value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="mode" onClick={() => setDark(!dark)}>
                {dark ? (
                    <i className="fa-solid fa-moon"></i>
                ) : (
                    <i className="fa-solid fa-sun"></i>
                )}
            </div>
        </nav>
    )
}

export default Navbar
