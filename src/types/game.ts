type Tile = number
type Empty = null
type Cell = Tile | Empty
type Board = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
]
type GameStatus = 'ongoing' | 'won' | 'lost'
type GameAction = 'newGame' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight'
type LegalMoveState = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}
interface GameState {
  board: Board
  status: GameStatus
  canMove: LegalMoveState
  newCells: [number, number][]
  mergedCells: [number, number][]
}
