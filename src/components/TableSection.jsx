import React, { useEffect } from 'react';
import Container from './container/Container';
import appwriteGameService from '../appwrite/gameServices';
import { setGameDate } from '../store/gamesSlice';
import { useSelector, useDispatch } from 'react-redux';

const TableSection = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameLists.gameData);
  useEffect(() => {

    const fetchGames = async () => {
      try {
        const response = await appwriteGameService.getGames();
        if (response?.documents) {
          const sortedGames = response.documents.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.starttime}`);
            const timeB = new Date(`1970-01-01T${b.starttime}`);
            return timeA - timeB;
          });
          dispatch(setGameDate(sortedGames));
        } else {
          console.warn('No game documents found in response');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();

  }, [dispatch]);
  

  const formatTiming = (timing) => {
    if (!timing) {
      return 'No time available';
    }

    const date = new Date(timing);
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

  return (
    <Container>
      <div className="table_cont text-center">
        <div className="bg_yellow_color">
          <table width="100%" border="1">
            <tbody>
              <tr className="bg-white font-semibold text_shadow">
                <th> MARKET </th>
                <th> OPEN </th>
                <th> CLOSE </th>
              </tr>
              {gameData?.map((game, title) => (
                <tr key={title}>
                  <td>{game.title}</td>
                  <td>{formatTiming(game.starttime)}</td>
                  <td>{formatTiming(game.endtime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default TableSection;
