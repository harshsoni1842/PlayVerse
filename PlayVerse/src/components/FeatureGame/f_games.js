import ticTacToeImage from './Games_image/tic_tac_toe.jpeg';
import rockPapper from './Games_image/rock_papper_scissor.jpeg';
import checker from './Games_image/checkers.jpeg';
import chess from './Games_image/chess.jpeg';

export const f_games = [
  {
    id: 1,
    title: "tictactoe",
    category: "adventure",
    rating: 4.5,
    players: "1-100",
    image: ticTacToeImage,  // use imported variable here
    featured: false  // if you want to add this game in featue so (false -> true)
  },
  {
    id: 2,
    title: "RockPaperScissor",
    category: "action",
    rating: 4.8,
    players: "1-4",
    image: rockPapper, // use imported variable here
    featured: false
  },
  {
    id: 3,
    title: "checkers",
    category: "rpg",
    rating: 4.9,
    players: "1-8",
    image: checker,
    featured: true
  },
  {
    id: 4,
    title: "chess",
    category: "racing",
    rating: 4.6,
    players: "1-12",
    image: chess,
    featured: true
  }
  //  {
  //     id: 4,
  //     title: "Speed Racer Elite",
  //     category: "racing",
  //     rating: 4.6,
  //     players: "1-12",
  //     image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
  //     featured: false
  //   }

];

