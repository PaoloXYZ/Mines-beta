import { GameState } from '../enums/enum';

export interface GameStatus {
  tiles: Array<Array<string>>;
  gameStatus: GameState;
}
