import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const MatkaPanelChart = () => {
  return (
    <div className="section_four_container border_red_line">
      <Container>
        <h3 className="section_header f_22">⇛ MATKA PANEL CHART</h3>

        <div className="font_semibold">
          <Link to="/result/surya/panel" className="lists_games">
            Surya Panel
          </Link>
          <Link to="/result/time-baza/panel" className="lists_games">
            Time Bazar Panel
          </Link>
          <Link to="/result/milan-day/panel" className="lists_games">
            Milan Day Panel
          </Link>
          <Link to="/result/surya-day/panel" className="lists_games">
            Surya Day Panel
          </Link>
          <Link to="/result/kalyan/panel" className="lists_games">
            Kalyan Panel
          </Link>
          <Link to="/result/surya-night/panel" className="lists_games">
            Surya Night Panel
          </Link>
          <Link to="/result/milan-night/panel" className="lists_games">
            Milan Night Panel
          </Link>
          <Link to="/result/sridevi/panel" className="lists_games">
            Sridevi Panel
          </Link>
          <Link to="/result/sridevi-night/panel" className="lists_games">
            Sridevi Night Panel
          </Link>
          <Link to="/result/main-bazar/panel" className="lists_games">
            Main Bazar Panel
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default MatkaPanelChart;
