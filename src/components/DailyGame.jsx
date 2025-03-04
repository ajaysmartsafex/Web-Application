import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const DailyGame = () => {
  return (
    <Container>
      <div className="table_container text-center px-3 my-3">
        <h3 className="charts_heading text-center py-2 font-semibold">
          ⇛ DAILY GAME ZONE
        </h3>

        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            ♣ Suryamatkaonline ♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-2xl blue_color">
            ♣ All Market Free Open To Close♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-xl blue_color">
            ♣ Free Seva Evergreen trick ♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-2xl blue_color">
            ♣ Vip MemberShip ♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-2xl blue_color">
            ♣ Weekly Line of All Market ♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-2xl blue_color">
            ♣ 20-20 Jodi Scheme ♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-2xl blue_color">
            ♣ 22 Khatri Favoirite panel Chart ♣
          </Link>
        </div>
        <div className="border_right border_left border_bottom font_semibold py-2">
          <Link to="#" className="text-2xl blue_color">
            ♣ Lifetime 4 Figures Golden Chart ♣
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default DailyGame;
