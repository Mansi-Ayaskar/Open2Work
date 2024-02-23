import React from 'react';
import '../Styles/NavBar.css';
import profile from '../Assets/profile.png';

const NavBar = () => {
    return (
        <div>
            <div className='navBar'>
                <h1 className='appName'>Open2Work</h1>
                <div className='rightNavbar'>
                    <button className='open2Work'>Are You Open2Work ?</button>
                    <img src={profile} alt="Avatar" className='profile'/>
                </div>
            </div>
        </div>
    );
};

export default NavBar;