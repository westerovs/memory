import Game from "./Game/Game.js";
import './style.css';
import PreloadState from "./Game/states/preload/PreloadState.js";
import GameState from "./Game/states/gameState/GameState.js";

window.createGame = () => {
  const game = new Game();
  window._game = game

  game.states = [
    new PreloadState(game),
    new GameState(game)
  ];

  game.start()
}
