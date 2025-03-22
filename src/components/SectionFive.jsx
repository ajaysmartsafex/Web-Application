import React from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';

const SectionFive = () => {
  return (
    <div className="section_five_container border_red_line text-center">
      <Container>
        <h1 className="py-2">
          अब खेलिए ऑनलाइन सट्टा मटका सबसे भरोसेमंद वेबसाइट के साथ
        </h1>
        <Link
          href="#"
          className="py-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          CLICK HERE 100% FREE
        </Link>
      </Container>
    </div>
  );
}

export default SectionFive
