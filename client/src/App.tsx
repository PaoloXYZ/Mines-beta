import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
import Game from './components/game';
import { ButtonAction } from './enums/enums';

function App() {
  const [displayGrid, setDisplayGrid] = useState({
    tiles: [['0']],
    gameStatus: 0,
  });

  const [move, setMove] = useState({ x: null, y: null });

  const [displayStatus, setDisplayStatus] = useState(ButtonAction.New);

  useEffect(() => {
    const getFielWithMove = async () => {
      await Axios.get(`http://localhost:4001/getGame`, {
        params: { x: move.x, y: move.y },
      }).then((response) => {
        setDisplayGrid(JSON.parse(response.data));
      });
    };
    getFielWithMove().catch(console.error);
  }, [move]);

  useEffect(() => {
    const setField = async (apiCall: string) => {
      await Axios.get(`http://localhost:4001/${apiCall}`).then((response) => {
        setDisplayGrid(JSON.parse(response.data));
      });
    };
    switch (displayStatus) {
      case ButtonAction.Solution:
        setField('getSolution').catch(console.error);
        break;
      case ButtonAction.New:
        setField('getNewGame').catch(console.error);
        break;
    }
  }, [displayStatus]);

  return (
    <>
      <p>x: {move.x}</p>
      <p>y: {move.y}</p>
      <button
        onClick={() => {
          setDisplayStatus(ButtonAction.New);
        }}
      >
        Get New Game
      </button>
      <button
        onClick={() => {
          setDisplayStatus(ButtonAction.Solution);
        }}
      >
        Get Solution
      </button>
      <p>{displayGrid.gameStatus}</p>
      <Game {...{ grid: displayGrid, setter: setMove }} />
    </>
  );
}

export default App;
