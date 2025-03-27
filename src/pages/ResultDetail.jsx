import React, { useEffect, useState, useCallback } from 'react';
import DpbossessLogo from '../assets/dp-logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { setGameResults } from '../store/resultsSlice';
import appwriteResultService from '../appwrite/resultServices';
import appwriteGameService from '../appwrite/gameServices';
import { setGameDate } from '../store/gamesSlice';
import { Container } from '../components/index';
import LoadingImage from '../assets/loading.gif';
import {
  startOfWeek,
  endOfWeek,
  getWeek,
  getYear,
  format,
  parseISO,
} from 'date-fns';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ResultDetail = () => {
  const [userData, setUserData] = useState({ title: '', gamenumber: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameName: slug } = useParams();
  const gameName = decodeURIComponent(slug);
  const gameResults = useSelector((state) => state.results?.gameResults || []);
  const [groupedResults, setGroupedResults] = useState({});

  const filteredDaysOfWeek =
    gameName === 'main-bazar'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      : ['kalyan', 'milan-night'].includes(gameName)
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : daysOfWeek;

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const gamesResponse = await appwriteGameService.getGames();
        if (gamesResponse?.documents) {
          const sortedGames = gamesResponse.documents.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.starttime}`);
            const timeB = new Date(`1970-01-01T${b.starttime}`);
            return timeA - timeB;
          });

          const getGameData = (gameName) => {
            const game = sortedGames.find((game) => game.$id === gameName);
            if (game) {
              return {
                title: game.title,
                gamenumber: game.gamenumber,
              };
            }
            return { title: 'Unknown Game', gamenumber: 'N/A' }; // Fallback
          };

          const userDatas = getGameData(gameName);
          setUserData(userDatas);

          const response = await appwriteResultService.getResults();
          if (response?.documents) {
            dispatch(setGameResults(response.documents));
          } else {
            console.warn('No documents found in response');
          }

          dispatch(setGameDate(sortedGames));
        } else {
          console.warn('No game documents found in response');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [gameName, dispatch]);

  useEffect(() => {
    if (gameName && gameResults.length > 0) {
      const filteredResults = gameResults.filter(
        (result) => slugTransform(result.gameName) === gameName
      );

      if (filteredResults.length > 0) {
        const grouped = filteredResults.reduce((acc, result) => {
          const date = parseISO(result.date);
          const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
          const endOfWeekDate = endOfWeek(date, { weekStartsOn: 1 });
          const weekYear =
            getYear(startOfWeekDate) === getYear(endOfWeekDate)
              ? getYear(startOfWeekDate)
              : getYear(endOfWeekDate);
          const week = getWeek(startOfWeekDate, { weekStartsOn: 1 });
          const weekKey = `${weekYear}-${week}`;
          const startDate = format(startOfWeekDate, 'dd-MM-yyyy');
          const endDate = format(endOfWeekDate, 'dd-MM-yyyy');
          if (!acc[weekKey]) {
            acc[weekKey] = { startDate, endDate, days: {} };
            daysOfWeek.forEach((day) => (acc[weekKey].days[day] = []));
          }
          const dayIndex = (date.getDay() + 6) % 7; // Shift Sunday to end
          const dayName = daysOfWeek[dayIndex] || 'Mon';

          const entry = {
            firstD: result.firstD || '*',
            secondD: result.secondD || '*',
            thirdD: result.thirdD || '*',
            fourD: result.fourD || '*',
            fiveD: result.fiveD || '*',
            sixD: result.sixD || '*',
            sevenD: result.sevenD || '*',
            eightD: result.eightD || '*',
          };

          

          // Prevent duplicate entries
          const isDuplicate = acc[weekKey].days[dayName].some(
            (existingEntry) =>
              JSON.stringify(existingEntry) === JSON.stringify(entry)
          );

          if (!isDuplicate) {
            acc[weekKey].days[dayName].push(entry);
          }

          return acc;
        }, {});

        Object.keys(grouped).forEach((week) => {
          daysOfWeek.forEach((day) => {
            if (grouped[week].days[day].length === 0) {
              grouped[week].days[day].push({
                firstD: '*',
                secondD: '*',
                thirdD: '*',
                fourD: '*',
                fiveD: '*',
                sixD: '*',
                sevenD: '*',
                eightD: '*',
              });
            }
          });
        });

        setGroupedResults(grouped);
      } else {
        console.warn('No results found for gameName:', gameName);
        setGroupedResults({});
      }
    }
  }, [gameName, gameResults, slugTransform]);

  const sortedWeeks = Object.entries(groupedResults).sort((a, b) => {
    const dateA = parseISO(a[1].startDate.split('-').reverse().join('-'));
    const dateB = parseISO(b[1].startDate.split('-').reverse().join('-'));
    return dateA - dateB;
  });

  const handleRefresh = () => {
    navigate(0);
  };
  const goToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const addRedClass = (fourD, fiveD) => {
    const specificPairs = [
      ['1', '6'],
      ['2', '7'],
      ['3', '8'],
      ['4', '9'],
      ['5', '0'],
      ['6', '1'],
      ['7', '2'],
      ['8', '3'],
      ['9', '4'],
      ['0', '5'],
    ];

    for (let pair of specificPairs) {
      if (
        (fourD === pair[0] && fiveD === pair[1]) ||
        (fourD === pair[1] && fiveD === pair[0])
      ) {
        return 'specific_number';
      }
    }

    if (fourD === fiveD) {
      return 'specific_number';
    }

    return '';
  };

  return (
    <div className="panel_chart">
      <Container>
        <div className="header_section border_red_line text-center">
          <Link to="/">
            <h2 className="w-full flex items-center justify-center">
              <img
                src={DpbossessLogo}
                alt="Dpbossess Logo"
                className="dpbossess_logo"
              />
            </h2>
          </Link>
        </div>
        <div className="section_header text-white uppercase f_18 border_radius_head_0 not-italic">
          {userData.title} PANEL CHART
        </div>
        <div className="border_red_line border_radius_head_0 background_linear">
          <p className="w-full dark_blue_color text_shadow_white font-bold f_14 not-italic py-1">
            {userData.title} PANEL RESULT CHART RECORDS
          </p>
          <p className="w-full dark_blue_color text_shadow_white font-bold not-italic f_12 text-center pb-1">
            dpbossess {userData.title} panel chart, {userData.title} panel
            chart, old {userData.title} panel chart, {userData.title} pana patti
            chart, dpboss {userData.title}, {userData.title} panel record,
            {userData.title} panel record, {userData.title} panel chart 2015,
            {userData.title}
            panel chart 2012, {userData.title} panel chart 2012 to 2023,
            {userData.title} final ank, {userData.title} panel chart.co,
            {userData.title} panel chart matka, {userData.title} panel chart
            book, {userData.title} matka chart, matka panel chart
            {userData.title}, matka {userData.title} chart, satta
            {userData.title} chart panel, {userData.title} state chart,
            {userData.title} chart result, डीपी बॉस, सट्टा चार्ट, सट्टा मटका
            पैनल चार्ट, सट्टा मटका पैनल चार्ट, मिलान मॉर्निंग मटका पैनल चार्ट,
            सट्टा मटका मिलान मॉर्निंग चार्ट पैनल, मिलान मॉर्निंग सट्टा चार्ट,
            मिलान मॉर्निंग पैनल चार्ट
          </p>
        </div>
        <div className="border_black_line text-center border_radius_head_0 py-1 not-italic">
          <h1 className="game_name text-xl font-bold uppercase">
            {userData.title}
          </h1>
          <h2 className="game_number text-xl font-bold">
            {userData.gamenumber}
          </h2>

          <button
            className="button border_radius_head_0 not-italic"
            onClick={handleRefresh}
          >
            Refresh Result
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button className="go_to_bottom" onClick={goToBottom}>
            Go To Bottom
          </button>
        </div>
        <div className="panel_result max-w-5xl m-auto text-center">
          <h3 className="panel_heading uppercase text-center not-italic">
            {userData.title} MATKA PANEL RECORD 2019 - 2025
          </h3>
          {sortedWeeks.length > 0 ? (
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="thead">
                  <th className="border border-gray-400 none_itelic py-1">
                    Date
                  </th>
                  {filteredDaysOfWeek.map((day) => (
                    <th
                      key={day}
                      className="border border-gray-400 none_itelic py-1"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedWeeks.map(([weekKey, data]) => (
                  <React.Fragment key={weekKey}>
                    <tr className="bg_transparent">
                      <td className="border border-gray-400 p-1 text-center none_itelic text-sm font-bold">
                        {data.startDate} <br />
                        To <br /> {data.endDate}
                      </td>
                      {filteredDaysOfWeek.map((day) => (
                        <td
                          key={`${weekKey}-${day}`}
                          className="border border-gray-400 text-center none_itelic"
                        >
                          {data.days[day]?.length > 0 ? (
                            <div className="grid grid-cols-3 w-full">
                              <div className="left-digits flex flex-col items-start pl-1">
                                {data.days[day].map((entry, index) => (
                                  <div key={`left-${weekKey}-${day}-${index}`}>
                                    <p
                                      className={`text-sm font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.firstD}
                                    </p>
                                    <p
                                      className={`text-sm font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.secondD}
                                    </p>
                                    <p
                                      className={`text-sm font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.thirdD}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="mid-digits font-bold flex items-center justify-center min-h-[60px]">
                                {data.days[day].map((entry, index) => (
                                  <div key={`mid-${weekKey}-${day}-${index}`}>
                                    <span
                                      className={`f_24 font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.fourD}
                                    </span>
                                    <span
                                      className={`f_24 font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.fiveD}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="right-digits flex flex-col items-end pr-1">
                                {data.days[day].map((entry, index) => (
                                  <div key={`right-${weekKey}-${day}-${index}`}>
                                    <p
                                      className={`text-sm font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.sixD}
                                    </p>
                                    <p
                                      className={`text-sm font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.sevenD}
                                    </p>
                                    <p
                                      className={`text-sm font-bold none_itelic ${addRedClass(
                                        entry.fourD,
                                        entry.fiveD
                                      )}`}
                                    >
                                      {entry.eightD}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            '*'
                          )}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="flex justify-center items-center">
              <img src={LoadingImage} alt="Loading..." />
            </p>
          )}
        </div>
        <div className="border_black_line text-center border_radius_head_0 py-1 not-italic">
          <h1 className="game_name text-xl font-bold uppercase">
            {userData.title}
          </h1>
          <h2 className="game_number text-xl font-bold">
            {userData.gamenumber}
          </h2>

          <button
            className="button border_radius_head_0 not-italic"
            onClick={handleRefresh}
          >
            Refresh Result
          </button>
        </div>

        <div className="footer-text-div">
          <p>
            Welcome to DPBossess Services, your premier destination for accurate
            and comprehensive {userData.title} Panel Chart Records in the realm
            of Satta Matka. At DPBossess, we are dedicated to providing
            enthusiasts with a reliable platform for accessing real-time data,
            historical records, and insightful analysis related to the
            {userData.title} panel charts. Whether you are a seasoned player or
            a newcomer, our commitment is to enhance your Satta Matka
            experience.
          </p>
          <br />
          <div className="small-heading">
            {userData.title} Panel Chart Records Online
          </div>
          <p>
            {userData.title} Panel Chart Records on DPBossess Services are
            meticulously curated, ensuring accuracy and relevance. Our charts
            are regularly updated to provide users with the latest information,
            allowing you to make informed decisions for your Satta Matka
            gameplay. Dive into the historical trends, identify patterns, and
            strategize with confidence using our user-friendly interface. Choose
            DPBossess Services as your go-to platform for {userData.title} Panel
            Chart Records, and elevate your Satta Matka experience with accurate
            data and strategic insights.
          </p>
          <br />
          <div className="faq-heading">
            Frequently Asked Questions (FAQ) for {userData.title} Panel Chart
            Records:
          </div>
          <p className="faq-title">
            Q1: How frequently are the {userData.title} Panel Chart Records
            updated on DPBossess Services?
          </p>
          <p className="faq-ans">
            DPBossess Services, we understand the importance of timely and
            accurate information. The {userData.title} Panel Chart Records are
            updated regularly to ensure users have access to the latest data for
            analysis and gameplay strategies. Count on us for real-time updates
            to enhance your Satta Matka journey.
          </p>
          <p className="faq-title">
            Q2: Is there a cost associated with accessing {userData.title} Panel
            Chart Records on DPBossess Services?
          </p>
          <p className="faq-ans">
            No, accessing {userData.title} Panel Chart Records on DPBossess
            Services is completely free of charge. We believe in making valuable
            information accessible to all Satta Matka enthusiasts. Simply visit
            our platform and explore the comprehensive {userData.title} panel
            charts to empower your gameplay without any financial commitment.
          </p>
        </div>
        <br />
        <div className="flex justify-center items-center">
          <button className="go_to_bottom" onClick={goToTop}>
            Go To Top
          </button>
        </div>
        <br />
        <footer className="footer_result">
          <Link to="/" className="ftr-icon" title="Dpbossess">
            Dpbossess.com
          </Link>
          <p>
            All Rights Reseved®
            <br />
            (1998-2024)
            <br />
            Contact (Astrologer-<span>Dpbossess</span>)
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default ResultDetail;
