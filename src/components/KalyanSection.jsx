import React from 'react';
import Container from './container/Container';

const KalyanSection = () => {
  return (
    <div className="kalyan_cont border_red_line text-center">
      <Container>
        <div className="section_header">⇛कल्याण पासिंग प्रूफ</div>
        <div align="center" className="result fntsnm">
          <div>
            <div>&nbsp;</div>
            <img
              src="https://dpbossess.com/kuberaya.jpg"
              alt=""
              height="200px"
              width="200px"
            />
            <div className="om">
              || ॐ कुबेराय नम: ||
              <br />
              ADMIN SIR की पेशकश
            </div>
            <div className="klyanbzr">
              <hr />
              कल्याण बाज़ार मैं तहलका मचाने आ गया
              <hr />
            </div>
            <div className="tahlka"> तहलका जोड़भाव </div>

            <div className="bg_yellow_color py-3">
              <div className="specialofr">आज के लिए स्पेशल </div>
              <div className="labhdayak">केवल कल्याण बाज़ार के लिए लाभदायक</div>
            </div>
          </div>
          <div className="text-center py-3">
            <div className="purpal_color text-2xl text_shadow_yellow">
              दो जोड़ी पैनल सहित <br />
              एडवांस मात्र 3100/- <br />
            </div>
            <div className="text-white text-2xl text_shadow">
              बुकिंग करने के लिए संपर्क करें:-
              <br />
              ♤ ADMIN SIR ♤<br />
            </div>
            <div className="text-white text-3xl text_shadow">
              +919076916189
              <br />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default KalyanSection;
