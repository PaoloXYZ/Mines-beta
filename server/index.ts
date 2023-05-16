import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { NewField, NewSolution } from './game/field';
import { GameStatus } from './commons/interfaces';
import { GameState } from './enums/enum';
import { Move } from './game/move';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT_SERVER;

app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    // `http://${process.env.IP_CLIENT}:${process.env.PORT_CLIENT}`
    'http://localhost:5173'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// let GameStatus: Array<Array<string>> = [];
// let Game: GameStatus = {};
const CreateNewGame = (x: number, y: number) => {
  return { tiles: NewField(x, y), gameStatus: GameState.NewGame };
};
const CreateNewSolution = (x: number, y: number, mn: number) => {
  return { tiles: NewSolution(x, y, mn), gameStatus: GameState.Solution };
};

let GameCurrent = CreateNewGame(5, 6);

let SolutionCurrent = CreateNewSolution(5, 6, 10);

app.get('/test', (req, res) => {
  res.json({ test: `${Date.UTC}` });
});

app.get('/getNewGame', (req, res) => {
  GameCurrent = CreateNewGame(5, 6);
  res.json(JSON.stringify(GameCurrent));
});

app.get('/getSolution', (req, res) => {
  res.json(JSON.stringify(SolutionCurrent));
});

app.get('/getGame', async (req, res) => {
  console.log(req.query);
  const result = await JSON.stringify(SolutionCurrent);
  // const result = null;
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
