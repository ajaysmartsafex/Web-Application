import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container/Container';

const FastLiveResult = () => {
  return (
    <Container>
      <div className="table_container px-3 my-3">
        <h3 className="charts_heading text-center py-2 font-semibold">
          !! FASTEST LIVE RESULT !!
        </h3>

        <div className="text-center border_right border_left">
          <div className="newst py-2">
            <div className="tg">Surya</div>
            <div className="tt">(11:00am)</div>
            <div className="bolditc">
              {'{22}'}
              <span className="redb ml-2">
                -[<strong>86</strong>]
              </span>
            </div>
            <Link to="#" className="marun_color">
              dpbossess.com
            </Link>
          </div>
          <div className="newst py-2">
            <div className="tg">Surya Day</div>
            <div className="tt">(03:00pm)</div>
            <div className="bolditc">
              {'{**}'}
              <span className="redb ml-2">
                -[<strong>**</strong>]
              </span>
            </div>
            <Link to="#" className="marun_color">
              dpbossess.com
            </Link>
          </div>
          <div className="newst py-2">
            <div className="tg">Surya Night</div>
            <div className="tt">(08:00pm)</div>
            <div className="bolditc">
              {'{**}'}
              <span className="redb ml-2">
                -[<strong>**</strong>]
              </span>
            </div>
            <Link to="#" className="marun_color">
              dpbossess.com
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FastLiveResult;
