import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const MatkaPanelChart = () => {
  return (
    <div className="section_four_container border_red_line">
      <Container>
        <div className="section_header yellow_color border_radius_12">
          ⇛ MATKA PANEL CHART
        </div>

        <div className="font_semibold">
          <Link to="/result/surya/panel" className="lists_games">
            SURYA Panel
          </Link>
          <Link to="/result/time-baza/panel" className="lists_games">
            TIME BAZAR Panel
          </Link>
          <Link to="/result/milan-day/panel" className="lists_games">
            MILAN DAY Panel
          </Link>
          <Link to="/result/surya-day/panel" className="lists_games">
            SURYA DAY Panel
          </Link>
          <Link to="/result/kalyan/panel" className="lists_games">
            KALYAN Panel
          </Link>
          <Link to="/result/surya-night/panel" className="lists_games">
            SURYA NIGHT Panel
          </Link>
          <Link to="/result/milan-night/panel" className="lists_games">
            MILAN NIGHT Panel
          </Link>
          <Link to="/result/sridevi/panel" className="lists_games">
            SRIDEVI Panel
          </Link>
          <Link to="/result/sridevi-night/panel" className="lists_games">
            SRIDEVI NIGHT Panel
          </Link>
          <Link to="/result/main-bazar/panel" className="lists_games">
            MAIN BAZAR Panel
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default MatkaPanelChart;
