import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/index';
import { useParams } from 'react-router-dom';
import { setGameResults } from '../store/resultsSlice';
import appwriteResultService from '../appwrite/resultServices';
import appwriteGameService from '../appwrite/gameServices';
import { setGameDate } from '../store/gamesSlice';
import { Container } from '../components/index';
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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await appwriteResultService.getResults();
        if (response?.documents) {
          dispatch(setGameResults(response.documents));
        } else {
          console.warn('No documents found in response');
        }

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
    return dateB - dateA;
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

  return (
    <div className="jodi_chart">
      <Container>
        <div className="border_red_line">
          <Link to="/">
            <h2 className="w-full flex items-center justify-center">
              <span className="red_color text-2xl font-bold">Dp</span>
              <span className="black_color text-2xl font-bold">
                bossess.com
              </span>
            </h2>
          </Link>
        </div>
        <div className="section_header text-white uppercase text-sm border_radius_head_0">
          {userData.title} JODI CHART
        </div>
        <div className="border_red_line border_radius_head_0">
          <p className="dark_blue_color text_shadow_white text-sm font-bold text-center p-2">
            MILAN MORNING JODI RESULT CHART RECORDS <br />
            suryamatkaonline.com MILAN MORNING jodi chart, MILAN MORNING jodi
            chart, old MILAN MORNING jodi chart, suryamatkaonline.com MILAN
            MORNING chart, MILAN MORNING jodi record, MILAN MORNINGjodi record,
            MILAN MORNING jodi chart 2015, MILAN MORNING jodi chart 2012, MILAN
            MORNING jodi chart 2012 to 2023, MILAN MORNING final ank, MILAN
            MORNING jodi chart.co, MILAN MORNING jodi chart matka, MILAN MORNING
            jodi chart book, MILAN MORNING matka chart, matka jodi chart MILAN
            MORNING, matka MILAN MORNING chart, satta MILAN MORNING chart jodi,
            MILAN MORNING state chart, MILAN MORNING chart result, डीपी बॉस,
            सट्टा चार्ट, सट्टा मटका जोड़ी चार्ट, सट्टा मटका जोड़ी चार्ट, मिलान डे
            मटका जोड़ी चार्ट, सट्टा मटका मिलान डे चार्ट जोड़ी, मिलान डे सट्टा
            चार्ट, मिलान डे जोड़ी चार्ट
          </p>
        </div>
        <div className="border_red_line text-center border_radius_head_0">
          <h1 className="game_name text-xl font-bold uppercase">
            {userData.title}
          </h1>
          <h2 className="game_number text-xl font-bold">
            {userData.gamenumber}
          </h2>

          <Button className="button" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>

        <div className="jodi_result max-w-3xl m-auto text-center">
          <button className="go_to_bottom" onClick={goToBottom}>
            Go To Bottom
          </button>

          <h3 className="panel_heading text-xl font-bold uppercase text-center">
            {gameName} MATKA PANEL RECORD 2019 - 2025
          </h3>
          {sortedWeeks.length > 0 ? (
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="thead">
                  {/* <th className="border border-gray-400 px-4 py-2">Date</th> */}
                  {daysOfWeek.map((day) => (
                    <th key={day} className="border border-gray-400 px-4 py-2">
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
                      {daysOfWeek.map((day) => (
                        <td
                          key={`${weekKey}-${day}`}
                          className="border border-gray-400 px-4 py-2 text-center"
                        >
                          {data.days[day]?.length > 0 ? (
                            <div className="grid gap-2 text-center w-full">
                              <div className="mid-digits font-bold flex items-center justify-center min-h-[60px]">
                                {data.days[day].map((entry, index) => (
                                  <div key={`mid-${weekKey}-${day}-${index}`}>
                                    <span className="text-2xl font-bold none_itelic">
                                      {entry.fourD}
                                    </span>
                                    <span className="text-2xl font-bold none_itelic">
                                      {entry.fiveD}
                                    </span>
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
            <p>No results available</p>
          )}
          <button className="go_to_bottom" onClick={goToTop}>
            Go To Top
          </button>
        </div>
        <div className="border_red_line text-center border_radius_head_0">
          <h1 className="game_name text-xl font-bold uppercase">
            {userData.title}
          </h1>
          <h2 className="game_number text-xl font-bold">
            {userData.gamenumber}
          </h2>

          <Button className="button" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
        <div className="bg-white text-center py-4 text-2xl font-bold blue_color text_shadow_yellow border-4 border-black">
          <Link href="#" title="Suryamatkaonline">
            SITEMAP
          </Link>
          <Link href="fix" title="date fix">
            DATE FIX
          </Link>
          <Link href="#" title="terms and condition">
            TERMS &amp; CONDITION
          </Link>
          <Link href="#" title="privacy policy">
            PRIVACY POLICY
          </Link>
          <Link href="#" title="about us">
            ABOUT US
          </Link>
          <Link href="#" title="contact us">
            CONTACT
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ResultJoid;
