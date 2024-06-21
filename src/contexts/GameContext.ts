import { createContext } from 'react'

const initialBoard = getEmptyBoard()
const cell1Position = generateNewCell(initialBoard)
const cell2Position = generateNewCell(initialBoard)

export const initialGameState: GameState = {
  board: initialBoard,
  prevBoard: getEmptyBoard(),
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
    newBoard = getEmptyBoard()
    const cell1Position = generateNewCell(newBoard)
    const cell2Position = generateNewCell(newBoard)
    return {
      board: newBoard,
      prevBoard: getEmptyBoard(),
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
      return { ...state, status: 'lost' }
  }
  const newCellPosition = generateNewCell(newBoard)
  const newState: GameState = {
    board: newBoard,
    prevBoard,
    status: 'ongoing',
    canMove: getCanMove(newBoard),
    score: score + mergeSum,
    newCells: [newCellPosition],
    mergedCells: mergedCells,
    movedCells: movedCells,
  }
  if (Object.values(newState.canMove).every((value) => value === false)) {
    newState.status = 'lost'
  }
  if (Object.values(newState.board).flat().some((cell) => cell === 2048)) {
    newState.status = 'won'
  }
  return newState
}

export const GameContext = createContext<[GameState, React.Dispatch<GameAction>]>([
  initialGameState,
  () => {},
])
function getEmptyBoard(): Board {
  return [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]
}
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
  for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
    let topEdge = 0
    for (let rowIndex = 1; rowIndex < board.length; rowIndex++) {
      const cell = board[rowIndex][colIndex]
      if (cell === null) continue
      let currentRowIndex = rowIndex
      while (currentRowIndex > topEdge) {
        currentRowIndex--
        const currentCell = board[currentRowIndex][colIndex]
        if (currentCell === null) {
        } else if (currentCell !== cell) {
          board[rowIndex][colIndex] = null
          board[currentRowIndex + 1][colIndex] = cell
          topEdge = currentRowIndex + 1
          movedCells.push([rowIndex, colIndex, currentRowIndex + 1, colIndex])
          break
        } else if (currentCell === cell) {
          board[rowIndex][colIndex] = null
          board[currentRowIndex][colIndex] = cell * 2
          topEdge = currentRowIndex + 1
          mergeSum += cell * 2
          mergedCells.push([currentRowIndex, colIndex])
          movedCells.push([rowIndex, colIndex, currentRowIndex, colIndex])
          break
        }
        if (currentRowIndex === topEdge) {
          board[topEdge][colIndex] = cell
          board[rowIndex][colIndex] = null
          topEdge = currentRowIndex
          movedCells.push([rowIndex, colIndex, topEdge, colIndex])
          break
        }
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
  for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
    let bottomEdge = board.length - 1
    for (let rowIndex = board.length - 2; rowIndex >= 0; rowIndex--) {
      const cell = board[rowIndex][colIndex]
      if (cell === null) continue
      let currentRowIndex = rowIndex
      while (currentRowIndex < bottomEdge) {
        currentRowIndex++
        const currentCell = board[currentRowIndex][colIndex]
        if (currentCell === null) {
        } else if (currentCell !== cell) {
          board[rowIndex][colIndex] = null
          board[currentRowIndex - 1][colIndex] = cell
          bottomEdge = currentRowIndex - 1
          movedCells.push([rowIndex, colIndex, currentRowIndex - 1, colIndex])
          break
        } else if (currentCell === cell) {
          board[rowIndex][colIndex] = null
          board[currentRowIndex][colIndex] = cell * 2
          bottomEdge = currentRowIndex - 1
          mergeSum += cell * 2
          mergedCells.push([currentRowIndex, colIndex])
          movedCells.push([rowIndex, colIndex, currentRowIndex, colIndex])
          break
        }
        if (currentRowIndex === bottomEdge) {
          board[bottomEdge][colIndex] = cell
          board[rowIndex][colIndex] = null
          bottomEdge = currentRowIndex
          movedCells.push([rowIndex, colIndex, bottomEdge, colIndex])
          break
        }
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
  board.map((row, rowIndex) => {
    let leftEdge = 0
    for (let colIndex = 1; colIndex < row.length; colIndex++) {
      const cell = row[colIndex]
      if (cell === null) continue
      let currentColIndex = colIndex
      while (currentColIndex > leftEdge) {
        currentColIndex--
        const currentCell = row[currentColIndex]
        if (currentCell === null) {
        } else if (currentCell !== cell) {
          row[colIndex] = null
          row[currentColIndex + 1] = cell
          leftEdge = currentColIndex + 1
          movedCells.push([rowIndex, colIndex, rowIndex, currentColIndex + 1])
          break
        } else if (currentCell === cell) {
          row[colIndex] = null
          row[currentColIndex] = cell * 2
          leftEdge = currentColIndex + 1
          mergeSum += cell * 2
          mergedCells.push([rowIndex, currentColIndex])
          movedCells.push([rowIndex, colIndex, rowIndex, currentColIndex])
          break
        }
        if (currentColIndex === leftEdge) {
          row[leftEdge] = cell
          row[colIndex] = null
          leftEdge = currentColIndex
          movedCells.push([rowIndex, colIndex, rowIndex, leftEdge])
          break
        }
      }
    }
  })
  return [board, mergeSum, mergedCells, movedCells]
}
function moveRight(
  board: Board,
): [Board, number, [number, number][], [number, number, number, number][]] {
  let mergeSum = 0
  const mergedCells: [number, number][] = []
  const movedCells: [number, number, number, number][] = []
  board.map((row, rowIndex) => {
    let rightEdge = row.length - 1
    for (let colIndex = row.length - 2; colIndex >= 0; colIndex--) {
      const cell = row[colIndex]
      if (cell === null) continue
      let currentColIndex = colIndex
      while (currentColIndex < rightEdge) {
        currentColIndex++
        const currentCell = row[currentColIndex]
        if (currentCell === null) {
        } else if (currentCell !== cell) {
          row[colIndex] = null
          row[currentColIndex - 1] = cell
          rightEdge = currentColIndex - 1
          movedCells.push([rowIndex, colIndex, rowIndex, currentColIndex - 1])
          break
        } else if (currentCell === cell) {
          row[colIndex] = null
          row[currentColIndex] = cell * 2
          rightEdge = currentColIndex - 1
          mergeSum += cell * 2
          mergedCells.push([rowIndex, currentColIndex])
          movedCells.push([rowIndex, colIndex, rowIndex, currentColIndex])
          break
        }
        if (currentColIndex === rightEdge) {
          row[rightEdge] = cell
          row[colIndex] = null
          rightEdge = currentColIndex
          movedCells.push([rowIndex, colIndex, rowIndex, rightEdge])
          break
        }
      }
    }
  })
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
