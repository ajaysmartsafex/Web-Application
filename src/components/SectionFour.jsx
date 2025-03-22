import React from 'react';
import Container from './container/Container';
import '../../src/App.css';

const SectionFour = () => {
  return (
    <div className="section_four_container border_red_line">
      <Container>
        <div className="section_header f_22">Today Lucky Number</div>
        <div className="section_four flex">
          <div className="text-center w-2/5">
            <h1 className="f_24 blue_color text_shadow_white">Golden Ank</h1>
            <p className="f_22 blue_color_dark">0-5-1-6</p>
          </div>
          <div className="text-center border-l border-red-500 w-3/5">
            <h1 className="f_24 blue_color text_shadow_white">Final Ank</h1>
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
  );
};

export default SectionFour;
