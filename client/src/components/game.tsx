import { Dispatch } from 'react';
import { GameStatus } from '../../../server/commons/interfaces';

interface TT {
  grid: GameStatus;
  setter: React.Dispatch<
    React.SetStateAction<{
      x: null;
      y: null;
    }>
  >;
}
function Game(props: TT) {
  const tileHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    // console.log(JSON.parse(button.name));
    props.setter(JSON.parse(button.name));
  };

  return (
    <>
      {props.grid.tiles.map((row: Array<string>, mapIndex: number) => {
        return (
          <div key={mapIndex}>
            {row.map((tile: string, rowIndex: number) => {
              return (
                <button
                  onClick={tileHandler}
                  key={rowIndex}
                  name={`{"x":${mapIndex},"y":${rowIndex}}`}
                >
                  {tile}
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default Game;
