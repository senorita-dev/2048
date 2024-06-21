type Tile = number
type Empty = null
type Cell = Tile | Empty
type Board = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
]
type GameStatus = 'ongoing' | 'won' | 'lost' | 'continuedWonGame'
type GameAction = 'newGame' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' | 'continueWonGame'
type LegalMoveState = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}
interface GameState {
  board: Board
  prevBoard: Board
  status: GameStatus
  canMove: LegalMoveState
  score: number
  newCells: [number, number][]
  mergedCells: [number, number][]
  movedCells: [number, number, number, number][]
}
