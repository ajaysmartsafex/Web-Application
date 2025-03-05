import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container/Container';

const Footer = () => {
  return (
    <>
      <div className="border_red_line">
        <Container>
          <div className="section_header text-white">MATKA</div>
          <div className="text-center">
            <p className="marun_color p-3 text-xs opacity-75">
              Madhur Matka | Satta Bazar | Satta Kurla | Satta Com | Satta Batta
              | Org Mobi Net In | Satta Master | Matka Game | Kapil Indian Matka
              | Matka Parivar 24 | Prabhat Matka | Tara Matka | Golden Matka |
              SattaMatka.Com | Madhur Matka satta result chart, satta khabar,
              matka India net, satakmatak, satta chart 2019, satta bazar result,
              satta live, satta bazar, satta matka Mumbai chart, satta live
              result, satta fast result, satta fast, satta today Number 10,
              Satta Matka.
            </p>
          </div>
        </Container>
      </div>

      <div className="border_red_line">
        <Container>
          <div className="section_header text-white">-:DISCLAIMER:-</div>
          <div className="text-center">
            <p className="gray_color p-3 text-xs opacity-75">
              Visiting this site and browsing it is strictly recommended at your
              own risk. Every information available here is only according to
              informational purpose and based on astrology and number
              calculations. We are no associated or affiliated with any illegal
              Matka business. We make sure we follow all rules and regulations
              of the regions where you are accessing the website. There are also
              chances that the website may be banned in your area and after that
              if you are using it, you are solely dependable and responsible for
              any damage, loss or legal action taken. If you are the one who
              does not like our disclaimer it is advised that you leave our
              website immediately. Copying of any information/contents posted on
              the website is strictly prohibited and against the law.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="section_header text-white ml-2 mr-2">
          POWERD BY dpbossess.com
        </div>
        <div className="border_red_line">
          <Container>
            <p class="powerd_by text-sm text-center marun_color py-3">
              © 2011 - 2025 dpbossess.com <br />
              <Link
                href="#"
                className="py-2 text-xs grays_color"
                target="_blank"
                rel="noopener noreferrer"
              >
                About us
              </Link>{' '}
              |
              <Link
                href="#"
                className="py-2 text-xs grays_color"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact us
              </Link>
              <br />
              <Link
                href="#"
                className="py-2 text-xs grays_color"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy &amp; policy
              </Link>{' '}
              |
              <Link
                href="#"
                className="py-2 text-xs grays_color"
                target="_blank"
                rel="noopener noreferrer"
              >
                Term And Conditions
              </Link>
            </p>
          </Container>
        </div>
        <div className="foote_cont text-center">
          <Link
            href="#"
            className="py-2 text-2xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            SITEMAP
          </Link>
          <Link
            href="#"
            className="py-2 text-2xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            DATE FIX
          </Link>
          <Link
            href="#"
            className="py-2 text-2xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            TERMS & CONDITION
          </Link>
          <Link
            href="#"
            className="py-2 text-2xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            PRIVACY POLICY
          </Link>
          <Link
            href="#"
            className="py-2 text-2xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            ABOUT US
          </Link>
          <Link
            href="#"
            className="py-2 text-2xl marun_color"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Footer;
