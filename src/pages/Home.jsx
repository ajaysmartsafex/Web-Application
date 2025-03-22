import React from 'react';
import {
  Container,
  WorldResult,
  Header,
  Welcome,
  SattaMatka,
  SectionFour,
  LiveResult,
  SectionFive,
  Notice,
  MainStarLine,
  SurayStarLine,
  FastLiveResult,
  WeeklySection,
  KalyanSection,
  TableSection,
  DailyGame,
  FreeOpen,
  MatkaJodiChart,
  MatkaPanelChart,
  Introduction,
  Footer,
} from '../components';

const Home = () => {
  return (
    <div className="w-full">
      <Container>
        <Header />
        <Welcome />
        <SattaMatka />
        <SectionFour />
        <LiveResult />
        <SectionFive />
        <Notice />
        <WorldResult />
        <MainStarLine />
        <SurayStarLine />
        <FastLiveResult />
        <WeeklySection />
        <KalyanSection />
        <TableSection />
        <DailyGame />
        <FreeOpen />
        <MatkaJodiChart />
        <MatkaPanelChart />
        <Introduction />
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
