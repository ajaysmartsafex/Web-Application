import React from 'react';
import Container from './container/Container';
import Kuberaya from '../assets/kuberaya.jpg';

const KalyanSection = () => {
  return (
    <div className="kalyan_cont border_red_line text-center">
      <Container>        
        <h3 className="section_header f_22">⇛ कल्याण पासिंग प्रूफ</h3>
        <div align="center" className="result fntsnm">
          <div>
            <div>&nbsp;</div>
            <img src={Kuberaya} alt="" height="200px" width="200px" />
            <div className="om text_shadow_yellow font-bold">
              || ॐ कुबेराय नम: ||
              <br />
              ADMIN SIR की पेशकश
            </div>
            <div className="klyanbzr font-bold text_shadow_yellow border_bottom border_top py-3">
              कल्याण बाज़ार मैं तहलका मचाने आ गया
            </div>
            <div className="tahlka text_shadow_yellow font-bold py-3">
              {' '}
              तहलका जोड़भाव{' '}
            </div>

            <div className="bg_yellow_color text_shadow_yellow font-semibold border_bottom border_top py-3">
              <div className="specialofr">आज के लिए स्पेशल </div>
              <div className="labhdayak">केवल कल्याण बाज़ार के लिए लाभदायक</div>
            </div>
          </div>
          <div className="text-center py-3">
            <div className="purpal_color text_shadow_yellow font-semibold text-2xl text_shadow_yellow">
              दो जोड़ी पैनल सहित <br />
              एडवांस मात्र 3100/- <br />
            </div>
            <div className="text-white font-semibold text-2xl text_shadow">
              बुकिंग करने के लिए संपर्क करें:-
              <br />
              ♤ ADMIN ♤<br />
            </div>
            {/* <div className="text-white font-semibold text-3xl text_shadow">
              +919076916189
              <br />
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default KalyanSection;
