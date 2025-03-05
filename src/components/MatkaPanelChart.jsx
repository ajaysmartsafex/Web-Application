import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const MatkaPanelChart = () => {
  return (
    <Container>
      <div className="table_container text-center px-3 my-3">
        <h3 className="charts_heading text-center py-2 font-semibold">
          ⇛ MATKA PANEL CHART
        </h3>

        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/surya/panel" className="text-xl blue_color">
            SURYA Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/time-baza/panel" className="text-xl blue_color">
            TIME BAZAR Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/milan-day/panel" className="text-xl blue_color">
            MILAN DAY Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/surya-day/panel" className="text-xl blue_color">
            SURYA DAY Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/kalyan/panel" className="text-xl blue_color">
            KALYAN Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/surya-night/panel" className="text-xl blue_color">
            SURYA NIGHT Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/milan-night/panel" className="text-xl blue_color">
            MILAN NIGHT Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/sridevi/panel" className="text-xl blue_color">
            SRIDEVI Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/sridevi-night/panel" className="text-xl blue_color">
            SRIDEVI NIGHT Panel
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="/result/main-bazar/panel" className="text-xl blue_color">
            MAIN BAZAR Panel
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default MatkaPanelChart
