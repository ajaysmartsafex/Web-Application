import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const MatkaJodiChart = () => {
  return (
    <div className="section_four_container border_red_line">
      <Container>
        <h3 className="section_header f_22">⇛ MATKA JODI CHART</h3>

        <div className="font_semibold">
          <Link to="/result/surya/jodi" className="lists_games">
            Surya Chart
          </Link>
          <Link to="/result/time-bazar/jodi" className="lists_games">
            Time Bazar Chart
          </Link>
          <Link to="/result/milan-day/jodi" className="lists_games">
            Milan Day Chart
          </Link>
          <Link to="/result/surya-day/jodi" className="lists_games">
            Surya Day Chart
          </Link>
          <Link to="/result/kalyan/jodi" className="lists_games">
            Kalyan Chart
          </Link>
          <Link to="/result/surya-night/jodi" className="lists_games">
            Surya Night Chart
          </Link>
          <Link to="/result/milan-night/jodi" className="lists_games">
            Milan Night Chart
          </Link>
          <Link to="/result/sridevi/jodi" className="lists_games">
            Sridevi Chart
          </Link>
          <Link to="/result/sridevi-night/jodi" className="lists_games">
            Sridevi Night Chart
          </Link>
          <Link to="/result/main-bazar/jodi" className="lists_games">
            Main Bazar Chart
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default MatkaJodiChart;
