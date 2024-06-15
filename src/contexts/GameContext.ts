import { createContext } from 'react'

const initialBoard: Board = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
]
const cell1Position = generateNewCell(initialBoard)
const cell2Position = generateNewCell(initialBoard)

export const initialGameState: GameState = {
  board: initialBoard,
  prevBoard: null,
  status: 'ongoing',
  canMove: getCanMove(initialBoard),
  score: 0,
  newCells: [cell1Position, cell2Position],
  mergedCells: [],
  movedCells: [],
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  const { board, status, score } = state
  const copyBoard: Board = JSON.parse(JSON.stringify(board))
  const prevBoard: Board = JSON.parse(JSON.stringify(board))
  let newBoard: Board
  let mergeSum: number
  let mergedCells: [number, number][]
  let movedCells: [number, number, number, number][]
  if (action === 'newGame') {
    newBoard = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]
    const cell1Position = generateNewCell(newBoard)
    const cell2Position = generateNewCell(newBoard)
    return {
      board: newBoard,
      prevBoard: null,
      status: 'ongoing',
      canMove: getCanMove(newBoard),
      score: 0,
      newCells: [cell1Position, cell2Position],
      mergedCells: [],
      movedCells: [],
    }
  }
  if (status === 'lost' || status === 'won') return state
  switch (action) {
    case 'moveUp':
      if (!isUpPossible(copyBoard)) return state
      ;[newBoard, mergeSum, mergedCells, movedCells] = moveUp(copyBoard)
      break
    case 'moveDown':
      if (!isDownPossible(copyBoard)) return state
      ;[newBoard, mergeSum, mergedCells, movedCells] = moveDown(copyBoard)
      break
    case 'moveLeft':
      if (!isLeftPossible(copyBoard)) return state
      ;[newBoard, mergeSum, mergedCells, movedCells] = moveLeft(copyBoard)
      break
    case 'moveRight':
      if (!isRightPossible(copyBoard)) return state
      ;[newBoard, mergeSum, mergedCells, movedCells] = moveRight(copyBoard)
      break
    default:
      return state
  }
  const newState: GameState = {
    board: newBoard,
    prevBoard,
    status: 'ongoing',
    canMove: getCanMove(newBoard),
    score: score + mergeSum,
    newCells: [],
    mergedCells: mergedCells,
    movedCells: movedCells,
  }
  if (Object.values(newState.canMove).every((value) => value === false)) {
    newState.status = 'lost'
    return newState
  }
  const newCellPosition = generateNewCell(newBoard)
  newState.newCells = [newCellPosition]
  newState.canMove = getCanMove(newBoard)
  return newState
}

export const GameContext = createContext<[GameState, React.Dispatch<GameAction>]>([
  initialGameState,
  () => {},
])

function getEmptyCells(board: Board): [number, number][] {
  const emptyCells: [number, number][] = []
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        emptyCells.push([rowIndex, colIndex])
      }
    })
  })
  return emptyCells
}
function generateNewCell(board: Board): [number, number] {
  const emptyCells = getEmptyCells(board)
  const [rowIndex, colIndex] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  board[rowIndex][colIndex] = Math.random() < 0.5 ? 2 : 4
  return [rowIndex, colIndex]
}
function moveUp(
  board: Board,
): [Board, number, [number, number][], [number, number, number, number][]] {
  let mergeSum = 0
  const mergedCells: [number, number][] = []
  const movedCells: [number, number, number, number][] = []
  for (let rowIndex = 1; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      const cell = board[rowIndex][colIndex]
      if (cell === null) continue
      let currRowIndex = rowIndex - 1
      while (currRowIndex >= 0) {
        const cellAbove = board[currRowIndex][colIndex]
        if (cellAbove === null) {
          currRowIndex -= 1
          continue
        }
        if (cellAbove === cell) {
          board[rowIndex][colIndex] = null
          board[currRowIndex][colIndex] = cell * 2
          mergeSum += cell * 2
          mergedCells.push([currRowIndex, colIndex])
        } else {
          board[rowIndex][colIndex] = null
          board[currRowIndex + 1][colIndex] = cell
          movedCells.push([rowIndex, colIndex, currRowIndex + 1, colIndex])
        }
        break
      }
      if (currRowIndex === -1) {
        board[rowIndex][colIndex] = null
        board[0][colIndex] = cell
        movedCells.push([rowIndex, colIndex, 0, colIndex])
      }
    }
  }
  return [board, mergeSum, mergedCells, movedCells]
}
function moveDown(
  board: Board,
): [Board, number, [number, number][], [number, number, number, number][]] {
  let mergeSum = 0
  const mergedCells: [number, number][] = []
  const movedCells: [number, number, number, number][] = []
  for (let rowIndex = board.length - 2; rowIndex >= 0; rowIndex--) {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      const cell = board[rowIndex][colIndex]
      if (cell === null) continue
      let currRowIndex = rowIndex + 1
      while (currRowIndex <= board.length - 1) {
        const cellBelow = board[currRowIndex][colIndex]
        if (cellBelow === null) {
          currRowIndex += 1
          continue
        }
        if (cellBelow === cell) {
          board[rowIndex][colIndex] = null
          board[currRowIndex][colIndex] = cell * 2
          mergeSum += cell * 2
          mergedCells.push([currRowIndex, colIndex])
        } else {
          board[rowIndex][colIndex] = null
          board[currRowIndex - 1][colIndex] = cell
          movedCells.push([rowIndex, colIndex, currRowIndex - 1, colIndex])
        }
        break
      }
      if (currRowIndex === board.length) {
        board[rowIndex][colIndex] = null
        board[board.length - 1][colIndex] = cell
        movedCells.push([rowIndex, colIndex, board.length - 1, colIndex])
      }
    }
  }
  return [board, mergeSum, mergedCells, movedCells]
}
function moveLeft(
  board: Board,
): [Board, number, [number, number][], [number, number, number, number][]] {
  let mergeSum = 0
  const mergedCells: [number, number][] = []
  const movedCells: [number, number, number, number][] = []
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 1; colIndex < board[0].length; colIndex++) {
      const cell = board[rowIndex][colIndex]
      if (cell === null) continue
      let currColIndex = colIndex - 1
      while (currColIndex >= 0) {
        const cellLeft = board[rowIndex][currColIndex]
        if (cellLeft === null) {
          currColIndex -= 1
          continue
        }
        if (cellLeft === cell) {
          board[rowIndex][colIndex] = null
          board[rowIndex][currColIndex] = cell * 2
          mergeSum += cell * 2
          mergedCells.push([rowIndex, currColIndex])
        } else {
          board[rowIndex][colIndex] = null
          board[rowIndex][currColIndex + 1] = cell
          movedCells.push([rowIndex, colIndex, rowIndex, currColIndex + 1])
        }
        break
      }
      if (currColIndex === -1) {
        board[rowIndex][colIndex] = null
        board[rowIndex][0] = cell
        movedCells.push([rowIndex, colIndex, rowIndex, 0])
      }
    }
  }
  return [board, mergeSum, mergedCells, movedCells]
}
function moveRight(
  board: Board,
): [Board, number, [number, number][], [number, number, number, number][]] {
  let mergeSum = 0
  const mergedCells: [number, number][] = []
  const movedCells: [number, number, number, number][] = []
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = board[0].length - 2; colIndex >= 0; colIndex--) {
      const cell = board[rowIndex][colIndex]
      if (cell === null) continue
      let currColIndex = colIndex + 1
      while (currColIndex <= board[0].length - 1) {
        const cellRight = board[rowIndex][currColIndex]
        if (cellRight === null) {
          currColIndex += 1
          continue
        }
        if (cellRight === cell) {
          board[rowIndex][colIndex] = null
          board[rowIndex][currColIndex] = cell * 2
          mergeSum += cell * 2
          mergedCells.push([rowIndex, currColIndex])
        } else {
          board[rowIndex][colIndex] = null
          board[rowIndex][currColIndex - 1] = cell
          movedCells.push([rowIndex, colIndex, rowIndex, currColIndex - 1])
        }
        break
      }
      if (currColIndex === board[0].length) {
        board[rowIndex][colIndex] = null
        board[rowIndex][board[0].length - 1] = cell
        movedCells.push([rowIndex, colIndex, rowIndex, board[0].length - 1])
      }
    }
  }
  return [board, mergeSum, mergedCells, movedCells]
}
function isLeftPossible(board: Board): boolean {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 1; colIndex < board[0].length; colIndex++) {
      const cell = board[rowIndex][colIndex]
      const leftCell = board[rowIndex][colIndex - 1]
      if (cell !== null) {
        if (cell === leftCell || leftCell === null) return true
      }
    }
  }
  return false
}
function isRightPossible(board: Board): boolean {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = board[0].length - 1; colIndex >= 0; colIndex--) {
      const cell = board[rowIndex][colIndex]
      const rightCell = board[rowIndex][colIndex + 1]
      if (cell !== null) {
        if (cell === rightCell || rightCell === null) return true
      }
    }
  }
  return false
}
function isUpPossible(board: Board): boolean {
  for (let rowIndex = 1; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      const cell = board[rowIndex][colIndex]
      const upCell = board[rowIndex - 1][colIndex]
      if (cell !== null) {
        if (cell === upCell || upCell === null) return true
      }
    }
  }
  return false
}
function isDownPossible(board: Board): boolean {
  for (let rowIndex = board.length - 2; rowIndex >= 0; rowIndex--) {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      const cell = board[rowIndex][colIndex]
      const downCell = board[rowIndex + 1][colIndex]
      if (cell !== null) {
        if (cell === downCell || downCell === null) return true
      }
    }
  }
  return false
}
function getCanMove(board: Board): LegalMoveState {
  return {
    up: isUpPossible(board),
    down: isDownPossible(board),
    left: isLeftPossible(board),
    right: isRightPossible(board),
  }
}
