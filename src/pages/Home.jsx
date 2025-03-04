import React from 'react';
import {
  Container,
  WorldResult,
  Header,
  Welcome,
  SattaMatka,
  SectionFour,
  Notice,
  LiveResult,
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
      </Container>
    </div>
  );
};

export default Home;
