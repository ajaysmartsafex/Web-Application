import React, { useEffect, useState } from 'react';
import Container from './container/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '.';
import appwriteGameService from '../appwrite/gameServices';
import { setGameDate } from '../store/gamesSlice';
import { useSelector, useDispatch } from 'react-redux';

const LiveResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameData = useSelector((state) => state.gameLists.gameData);
  const [filteredGames, setFilteredGames] = useState([]);

  const handleRefresh = () => {
    navigate(0); 
  };

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

  useEffect(() => {
    const now = new Date();
    const currentTime = now.getTime();
    const filtered = gameData.filter((game) => {
      if (game.title === 'MAIN BAZAR') {
        return true;
      }
      const startTime = new Date(game.starttime).getTime();
      const endTime = new Date(game.endtime).getTime();
      if (isNaN(startTime) || isNaN(endTime)) {
        console.warn(`Invalid time for game: ${game.title}`, game);
        return false;
      }
      const isOngoing = currentTime >= startTime && currentTime <= endTime;
      return isOngoing;
    });

    setFilteredGames(filtered.length > 0 ? filtered : gameData);
  }, [gameData]);

  return (
    <div className="border_red_line text-center">
      <Container>
        <div className="section_header">☔ Live Result ☔</div>
        <h1 className="text-xl font-medium">
          SAB SE TEZ RESULTS YAHI MILEGA
          <br /> <span className="red_color">dp</span>
          <span className="black_color">bossess.com</span>
        </h1>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            return (
              <div
                key={game.$id}
                className="grid grid-cols-1 border-b border-red-600 p-4 mb-4 text-center"
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
