import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container/Container';

const Notice = () => {
  return (
    <>
      <div className="border_red_line">
        <Container>
          <div className="section_header">☆ NOTICE ☆</div>
          <div className="text-center">
            <h1 className="py-2 text-xl">
              अपना बाजार dpbossess.com वेबसाइट में डलवाने के लिए आज ही हमें ईमेल
              करें
            </h1>
            <Link
              href="#"
              className="py-2 text-2xl marun_color"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email : support@dpbossess.com
            </Link>
            <h1 className="py-2 text-xl">शर्ते लागु</h1>
          </div>
        </Container>
      </div>
      <div className="border_red_line">
        <Container>
          <p className="grays_color text-sm text-center">
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
