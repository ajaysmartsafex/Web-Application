import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container/Container';

const Notice = () => {
  return (
    <>
      <div className="border_red_line">
        <Container>
          <div className="section_header yellow_color">☆ NOTICE ☆</div>
          <div className="text-center">
            <h1 className="py-2 text-base font-bold">
              अपना बाजार dpbossess.com वेबसाइट में डलवाने <br />
              के लिए आज ही हमें ईमेल करें
            </h1>
            <Link
              href="#"
              className="py-2 text-base font-bold blue_color"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email : support@dpbossess.com
            </Link>
            <h1 className="py-2 text-base font-bold">शर्ते लागु</h1>
          </div>
        </Container>
      </div>
      <div className="border_red_line">
        <Container>
          <p className="dark_blue_color text_shadow_white text-sm font-bold text-center p-2">
            KALYAN MATKA | MATKA RESULT | KALYAN MATKA TIPS | SATTA MATKA |
            MATKA.COM | MATKA PANA JODI TODAY | BATTA SATKA | MATKA PATTI JODI
            NUMBER | MATKA RESULTS | MATKA CHART | MATKA JODI | SATTA COM | FULL
            RATE GAME | MATKA GAME | MATKA WAPKA | ALL MATKA RESULT LIVE ONLINE
            | MATKA RESULT | KALYAN MATKA / MATKA RESULT / KALYAN MATKA TIPS
            /.../DPBOSSESS.COM MATKA 143 / MAIN MATKA
          </p>
        </Container>
      </div>
    </>
  );
};

export default Notice;
