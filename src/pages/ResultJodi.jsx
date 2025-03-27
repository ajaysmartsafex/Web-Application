import React, { useEffect, useState, useCallback } from 'react';
import DpbossessLogo from '../assets/dp-logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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

const ResultJoid = () => {
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
    // return dateB - dateA;
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
    <div className="jodi_chart">
      <Container>
        <div className="header_section border_red_line">
          <Link to="/" className="w-full flex text-center">
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
          {userData.title} JODI CHART
        </div>
        <div className="border_red_line border_radius_head_0 background_linear">
          <p className="w-full dark_blue_color text_shadow_white font-bold f_14 not-italic py-1">
            {userData.title} JODI RESULT CHART RECORDS
          </p>
          <p className="w-full dark_blue_color text_shadow_white font-bold not-italic f_12 text-center pb-1">
            Dpbossess {userData.title} jodi chart, {userData.title}
            jodi chart, old {userData.title} jodi chart, Dpbossess
            {userData.title} chart, {userData.title}
            jodi record, {userData.title}jodi record, {userData.title} jodi
            chart 2015, {userData.title}
            jodi chart 2012, {userData.title} jodi chart 2012 to 2023,
            {userData.title} final ank,
            {userData.title} jodi chart.co, {userData.title} jodi chart matka,
            {userData.title} jodi chart book, {userData.title} matka chart,
            matka jodi chart {userData.title}, matka {userData.title}
            chart, satta {userData.title} chart jodi, {userData.title} state
            chart, {userData.title} chart result, डीपी बॉस, सट्टा चार्ट, सट्टा
            मटका जोड़ी चार्ट, सट्टा मटका जोड़ी चार्ट, {userData.title} मटका जोड़ी
            चार्ट, सट्टा मटका {userData.title} चार्ट जोड़ी, {userData.title}
            सट्टा चार्ट, {userData.title} जोड़ी चार्ट
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
        <div className="jodi_result max-w-3xl m-auto text-center">
          <h3 className="panel_heading uppercase text-center not-italic">
            {userData.title} MATKA CHART RECORD 2019 - 2025
          </h3>
          {sortedWeeks.length > 0 ? (
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="thead">
                  {/* <th className="border border-gray-400 px-4 py-2">Date</th> */}
                  {filteredDaysOfWeek.map((day) => (
                    <th
                      key={day}
                      className="border border-gray-800 none_itelic py-1"
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
                      {/* <td className="border border-gray-400 px-4 py-2 font-bold text-center"> 
                        {data.startDate} <br /> to <br /> {data.endDate}
                      </td>*/}
                      {filteredDaysOfWeek.map((day) => (
                        <td
                          key={`${weekKey}-${day}`}
                          className="border border-gray-800 text-center max-w-16"
                        >
                          {data.days[day]?.length > 0 ? (
                            <div className="mid-digits font-bold flex items-center justify-center py-1">
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
            It is quite natural that the best betting website can differ based
            on individual preferences and geographic location. Additionally, the
            online betting landscape is dynamic, with new websites emerging and
            existing ones changing. What may be considered the best for one
            person might not be the same for another. However, when it comes to
            DPBossess Services, almost all gamblers on the earth will usually
            prefer this betting platform not only to play {userData.title} but
            also other Satta Matka games
          </p>
          <br />
          <div className="small-heading">
            Get {userData.title} Jodi Chart Records
          </div>
          <p>
            When you consider DPBossess Services to play the {userData.title}{' '}
            game, you do not need to search for other analogous sites online.
            Most reputable sources on the earth suggest gamblers choose this
            Satta Matka website to play not only the {userData.title} game but
            also all other types of Satta Matka games. Whatever variations you
            need to play your favorite Satta Matka game, you will be capable of
            finding it easily and quickly on DPBossess Services. Moreover, the
            only Satta Matka website that has tons of positive feedback and
            customer reviews is DPBossess Services. Thus, you can rest assured
            that the website can meet your specific needs, criteria for
            security, game diversity, bonuses, and customer backing
          </p>
          <br />
          <div className="faq-heading">Frequently Asked Questions (FAQs):</div>
          <p className="faq-title">
            Q1: Can I Play my {userData.title} game on DPBossess Services from
            any part of the world?
          </p>
          <p className="faq-ans">
            Yes, you can because DPBossess Services provides its website users
            with the convenience to play not only their {userData.title} game
            but also other Satta Matka games from anywhere on earth.
          </p>
          <p className="faq-title">
            Q2: Why most gamplaers prefer DPBossess Services?
          </p>
          <p className="faq-ans">
            It is because the website it meets the entire playing needs of both
            novice players as well as veteran gamblers.
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

export default ResultJoid;
