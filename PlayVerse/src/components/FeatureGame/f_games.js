import ticTacToeImage from './Games_image/tic_tac_toe.jpeg';
import rockPapper from './Games_image/rock_papper_scissor.jpeg';
import checker from './Games_image/checkers.jpeg';

import spaceInvader from './Games_image/space_shooter.jpeg';
import memoryMatch from './Games_image/Memory_metching.jpeg';
import reactionTime from './Games_image/reaction_time_tester.jpeg';

import chess from './Games_image/chess.jpeg';

export const f_games = [
  {
    id: 1,
    title: "Tic Tac Toe",
    category: "strategy",
    rating: 4.5,
    players: "1-100",
    image: ticTacToeImage,  // use imported variable here
    featured: false  // if you want to add this game in featue so (false -> true)
  },
  {
    id: 2,
    title: "Rock Papper Scissor",
    category: "action",
    rating: 4.8,
    players: "1-4",
    image: rockPapper, // use imported variable here
    featured: false
  },
  {
    id: 3,
    title: "Checkers",
    category: "strategy",
    rating: 4.9,
    players: "1-8",
    image: checker,
    featured: true
  },
  {
    id: 4,
    title: "Space Invader",
    category: "action",
    rating: 4.6,
    players: "1-12",
    image: spaceInvader,
    featured: true
  },
  {
    id: 5,
    title: "Memory Matching",
    category: "strategy",
    rating: 4.6,
    players: "1-12",
    image: memoryMatch,
    featured: true
  },
  {
    id: 6,
    title: "Reaction Time Tester",
    category: "strategy",
    rating: 4.6,
    players: "1-12",
    image: reactionTime,
    featured: true
  }
  // {
  //   id: 4,
  //   title: "Chess",
  //   category: "Strategy",
  //   rating: 4.6,
  //   players: "1-12",
  //   image: chess,
  //   featured: true
  // },

];
