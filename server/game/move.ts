import { arrayBuffer } from 'stream/consumers';
import { GameState } from '../enums/enum';
export function Move(
  field: Array<Array<string>>,
  solution: Array<Array<string>>,
  x: number,
  y: number
): { field: Array<Array<string>>; gameState: GameState } {
  let gameState: GameState = GameState.Ongoing;

  return { field, gameState };
}
