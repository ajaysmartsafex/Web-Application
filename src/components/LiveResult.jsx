import React, { useEffect } from 'react';
import Container from './container/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '.';
import appwriteGameService from '../appwrite/gameServices';
import { setGameDate } from '../store/gamesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { initSocket, closeSocket } from '../socket';

const LiveResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameData = useSelector((state) => state.gameLists.gameData);

  const handleRefresh = () => {
    navigate(0);
  };

  useEffect(() => {
    initSocket();
    return () => {
      closeSocket();
    };
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
          dispatch(setGameDate(sortedGames));
        } else {
          console.warn('No game documents found in response');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [dispatch]);

  const filteredGames = gameData.filter((game) => {
    const startTime = new Date(game.starttime);
    const endTime = new Date(game.endtime);
    const currentTime = new Date();

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      console.warn(`Invalid date format for game: ${game.title}`);
      return false;
    }

    const currentISTTime = currentTime.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const startISTTime = startTime.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const endISTTime = endTime.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const isOngoing =
      currentISTTime >= startISTTime && currentISTTime <= endISTTime;

    return isOngoing;
  });

  // if (filteredGames.length === 0) {
  //   console.log('No games available');
  // }

  return (
    <div className="border_red_line text-center">
      <Container>
        <div className="section_header yellow_color">☔ Live Result ☔</div>
        <h1 className="text-xl font-medium mb-2 uppercase text_shadow">
          Sab se tez result yahi milega
          <br /> <span className="red_color">dp</span>
          <span className="black_color">bossess.com</span>
        </h1>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            return (
              <div
                key={game.$id}
                className="border-t border-red-600 grid grid-cols-1 p-2 mb-2 text-center"
              >
                <h1 className="game_name text-xl font-bold">{game.title}</h1>
                <h2 className="game_number text-xl font-bold">
                  {game.gamenumber || 'N/A'}
                </h2>
                <Link to="#">
                  <Button className="button mr-3" onClick={handleRefresh}>
                    Refresh
                  </Button>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No games available</p>
        )}
      </Container>
    </div>
  );
};

export default LiveResult;
