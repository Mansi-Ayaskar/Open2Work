import React from 'react';
import '../Styles/NavBar.css';
import profile from '../Assets/profile.png';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };
  return (
    <div>
      <div className="navBar">
        <div className='navBarHeader'>
            <div className='outerFlex'>
                <div className='innerFlex'>
                    <h1 className="appName">Open2Work</h1>
                    <p className="tagLine">: Your Talent Search Simplified !</p>
                </div>
                <p className='headerSubTitle'>Dream, Create, Collaborate, Your next project Awaits !</p>
            </div>
        </div>
        <div className="rightNavbar">
          <button className="open2Work" onClick={goToProfile}>
            Are You Open2Work ?
          </button>
          <img src={profile} alt="Avatar" className="profile" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
