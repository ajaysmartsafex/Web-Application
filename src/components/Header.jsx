import React from 'react';
import DpbossessLogo from '../assets/dp-logo.png';

const Header = () => {
  return (
    <div className='header_section'>
      <h2 className="w-full flex items-center justify-center">
        <img src={DpbossessLogo} alt="Dpbossess Logo" className='dpbossess_logo'/>
      </h2>      
    </div>
  )
}

export default Header

