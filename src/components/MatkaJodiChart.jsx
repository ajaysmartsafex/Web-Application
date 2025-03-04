import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const MatkaJodiChart = () => {
  return (
    <Container>
      <div className="table_container text-center px-3 my-3">
        <h3 className="charts_heading text-center py-2 font-semibold">
          ⇛ MATKA JODI CHART
        </h3>

        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            SURYA Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            TIME BAZAR Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            MILAN DAY Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            SURYA DAY Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            KALYAN Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            SURYA NIGHT Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            MILAN NIGHT Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            SRIDEVI Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            SRIDEVI NIGHT Chart
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            MAIN BAZAR Chart
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default MatkaJodiChart;
