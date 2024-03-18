type Tile = number;
type Empty = null;
type Cell = Tile | Empty;
type Board = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell]
];
type GameStatus = 'ongoing' | 'won' | 'lost';
type GameAction = 'newGame' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight';