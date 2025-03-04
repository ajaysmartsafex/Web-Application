import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';
import '../../src/App.css';

const SectionFour = () => {
  return (
    <>
      <div className="section_four_container border_red_line">
        <Container>
          <div className="section_header">Today Lucky Number</div>
          <div className="section_four grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between items-center">
            <div className="text-center">
              <h1 className="blue_color text-2xl">Golden Ank</h1>
              <h2 className="purpal_color text-xl">0-5-1-6</h2>
            </div>
            <div className="text-center border-l-2 border-red-500">
              <h1 className="blue_color text-2xl">Final Ank</h1>
              <div className="amthltg">
                <p className="scroll-text text-xs">
                  MILAN MORNING - 0<br />
                  SRIDEVI - 2<br />
                  KALYAN MORNING - 2<br />
                  MADHURI - 2<br />
                  SRIDEVI MORNING - 4<br />
                  KARNATAKA DAY - 6<br />
                  TIME BAZAR - 0<br />
                  MILAN DAY - 8<br />
                  KALYAN - 0<br />
                  SRIDEVI NIGHT - 0<br />
                  MADHURI NIGHT - 0<br />
                  MILAN NIGHT - 6<br />
                  RAJDHANI NIGHT - 2<br />
                  MAIN BAZAR - 4<br />
                  MUMBAI MORNING - 2<br />
                  KALYAN NIGHT - 8<br />
                  NAMASTHE - 0<br />
                  OLD MAIN MUMBAI - 2<br />
                  MADHUR DAY - 2<br />
                  MADHUR NIGHT - 8<br />
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="section_four_container border_red_line text-center">
        <Container>
          <h1 className="py-2 text-xl">
            अब खेलिए ऑनलाइन सट्टा मटका सबसे भरोसेमंद वेबसाइट के साथ
          </h1>
          <Link
            href="#"
            className="py-2 text-3xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            CLICK HERE 100% FREE
          </Link>
        </Container>
      </div>
    </>
  );
};

export default SectionFour;
