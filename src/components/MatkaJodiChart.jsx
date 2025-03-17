import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const MatkaJodiChart = () => {
  return (
    <div className="section_four_container border_red_line">
      <Container>
        <div className="section_header yellow_color border_radius_12">
          ⇛ MATKA JODI CHART
        </div>

        <div className="font_semibold">
          <Link to="/result/surya/jodi" className="lists_games">
            SURYA Chart
          </Link>
          <Link to="/result/time-bazar/jodi" className="lists_games">
            TIME BAZAR Chart
          </Link>
          <Link to="/result/milan-day/jodi" className="lists_games">
            MILAN DAY Chart
          </Link>
          <Link to="/result/surya-day/jodi" className="lists_games">
            SURYA DAY Chart
          </Link>
          <Link to="/result/kalyan/jodi" className="lists_games">
            KALYAN Chart
          </Link>
          <Link to="/result/surya-night/jodi" className="lists_games">
            SURYA NIGHT Chart
          </Link>
          <Link to="/result/milan-night/jodi" className="lists_games">
            MILAN NIGHT Chart
          </Link>
          <Link to="/result/sridevi/jodi" className="lists_games">
            SRIDEVI Chart
          </Link>
          <Link to="/result/sridevi-night/jodi" className="lists_games">
            SRIDEVI NIGHT Chart
          </Link>
          <Link to="/result/main-bazar/jodi" className="lists_games">
            MAIN BAZAR Chart
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default MatkaJodiChart;
