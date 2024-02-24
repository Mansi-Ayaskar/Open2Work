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
        <h1 className="appName">Open2Work</h1>
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
