import React from 'react';
import LakshmiImage from '../assets/Lakshmi.jpg';

const Welcome = () => {
  return (
    <div className="welcome_section border_red_line grid grid-cols-2 md:grid-cols-2 gap-1 justify-between items-center">
      <div>
        <img src={LakshmiImage} alt="Lakshmi" width="100px" height="200px" />
      </div>
      <div className='text-right pr-1 font-bold text-lg'>
        !! Welcome to <span className="red_color">dp</span>
        <span className="black_color">bossess.com</span> international !! Satta Matka
        Fast Result
      </div>
    </div>
  );
};

export default Welcome;
