import React, { useEffect } from 'react';
import Container from './container/Container';
import { Link } from 'react-router-dom';
import { Button } from '.';
import appwriteGameService from '../appwrite/gameServices';
import appwriteResultService from '../appwrite/resultServices';
import { setGameDate } from '../store/gamesSlice';
import { setGameResults } from '../store/resultsSlice';
import { useSelector, useDispatch } from 'react-redux';

function WorldResult() {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameLists.gameData);
  const gameResults = useSelector((state) => state.results.gameResults);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch games
        const gamesResponse = await appwriteGameService.getGames();
        if (gamesResponse?.documents) {
          const sortedGames = gamesResponse.documents.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.starttime}`);
            const timeB = new Date(`1970-01-01T${b.starttime}`);
            return timeA - timeB;
          });
          dispatch(setGameDate(sortedGames));
        } else {
          console.warn('No game documents found in response');
        }

        // Fetch game results
        const resultsResponse = await appwriteResultService.getResults();
        if (resultsResponse?.documents) {
          dispatch(setGameResults(resultsResponse.documents));
        } else {
          console.warn('No result documents found in response');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [dispatch]);

  const formatStartTime = (starttime) => {
    if (!starttime) {
      return 'No time available';
    }

    const date = new Date(starttime);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      //second: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      ...options,
    });
  };

  const formatEndTime = (endtime) => {
    if (!endtime) {
      return 'No time available';
    }

    const date = new Date(endtime);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      //second: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      ...options,
    });
  };

  const specialGames = [
    'surya',
    'surya-day',
    'surya-night',
    'kalyan',
    'main-bazar',
  ];

  return (
    <div className="world_result border_red_line">
      <Container>
        <div className="section_header">
          ☔ WORLD ME SABSE FAST SATTA MATKA RESULT ☔
        </div>
        {gameData.length > 0 ? (
          gameData.map((game) => {
            const gameResult = gameResults.find(
              (result) => result.gameName === game.title
            );
            const gameName = gameResult ? gameResult.gameName : 'unknown-game';

            return (
              <div
                key={game.$id}
                className={`game_card p-2 border-b border-red-600 text-center ${
                  specialGames.includes(game.$id) ? 'bg_yellow_color' : ''
                }`}
              >
                <div>
                  <Link
                    to={`/result/${gameName
                      .replace(/\s+/g, '-')
                      .toLowerCase()}/jodi`}
                  >
                    <Button className="button mr-2">Jodi</Button>
                  </Link>
                </div>
                <div className='text-center'>
                  <h1 className="game_name text-xl font-bold">{game.title}</h1>
                  <h2 className="game_number text-xl font-bold">
                    {game.gamenumber || 'N/A'}
                  </h2>
                  <div className="game_time uppercase">
                      {formatStartTime(game.starttime)}
                      {' - '}
                      {formatEndTime(game.endtime)}
                  </div>
                </div>
                <div>
                  <Link
                    to={`/result/${gameName
                      .replace(/\s+/g, '-')
                      .toLowerCase()}/panel`}
                  >
                    <Button className="button mr-2">Panel</Button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No games available</p>
        )}
      </Container>
    </div>
  );
}

export default WorldResult;
