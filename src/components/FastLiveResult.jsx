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
          <div className="newst">
            Surya <br />
            <div className="tt">(11:00am)</div>
            <div className="bolditc">
              {22}{' '}
              <span className="redb">
                -[<strong>86</strong>]
              </span>
            </div>
            <Link to="#">dpbossess.com</Link>
          </div>
          <div className="newst">
            Surya Day
            <br />
            <div className="tt">(03:00pm)</div>
            <div className="bolditc">
              {'**'}{' '}
              <span className="redb">
                -[<strong>**</strong>]
              </span>
            </div>
            <Link to="#">dpbossess.com</Link>
          </div>
          <div className="newst">
            Surya Night
            <br />
            <div className="tt">(08:00pm)</div>
            <div className="bolditc">
              {'**'}{' '}
              <span className="redb">
                -[<strong>**</strong>]
              </span>
            </div>
            <Link to="#">dpbossess.com</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FastLiveResult;
