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
  status: 'ongoing',
  canMove: getCanMove(initialBoard),
  newCells: [cell1Position, cell2Position],
  mergedCells: [],
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  const { board, status } = state
  const copyBoard: Board = JSON.parse(JSON.stringify(board))
  let newBoard: Board
  let mergedCells: [number, number][]
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
      status: 'ongoing',
      canMove: getCanMove(newBoard),
      newCells: [cell1Position, cell2Position],
      mergedCells: [],
    }
  }
  if (status === 'lost' || status === 'won') return state
  switch (action) {
    case 'moveUp':
      if (!isUpPossible(copyBoard)) return state
      ;[newBoard, mergedCells] = moveUp(copyBoard)
      break
    case 'moveDown':
      if (!isDownPossible(copyBoard)) return state
      ;[newBoard, mergedCells] = moveDown(copyBoard)
      break
    case 'moveLeft':
      if (!isLeftPossible(copyBoard)) return state
      ;[newBoard, mergedCells] = moveLeft(copyBoard)
      break
    case 'moveRight':
      if (!isRightPossible(copyBoard)) return state
      ;[newBoard, mergedCells] = moveRight(copyBoard)
      break
    default:
      return state
  }
  const newState: GameState = {
    board: newBoard,
    status: 'ongoing',
    canMove: getCanMove(newBoard),
    newCells: [],
    mergedCells: mergedCells,
  }
  if (Object.values(newState.canMove).every((value) => value === false)) {
    newState.status = 'lost'
    return newState
  }
  const newCellPosition = generateNewCell(newBoard)
  newState.newCells = [newCellPosition]
  newState.mergedCells = mergedCells
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
function shiftCellsUp(board: Board) {
  for (let rowIndex = 1; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex]
    row.forEach((cell, colIndex) => {
      if (cell === null) return
      let i = rowIndex - 1
      for (i; i >= 0; i--) {
        const cellAbove = board[i][colIndex]
        if (cellAbove !== null) {
          board[rowIndex][colIndex] = null
          board[i + 1][colIndex] = cell
          break
        }
        if (i === 0) {
          board[rowIndex][colIndex] = null
          board[i][colIndex] = cell
        }
      }
    })
  }
}
function moveUp(board: Board): [Board, [number, number][]] {
  const mergedCells: [number, number][] = []
  shiftCellsUp(board)
  for (let rowIndex = 1; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex]
    row.forEach((cell, colIndex) => {
      if (cell === null) return
      if (cell === board[rowIndex - 1][colIndex]) {
        board[rowIndex - 1][colIndex] = cell * 2
        board[rowIndex][colIndex] = null
        let currRowIndex = rowIndex
        while (currRowIndex > 0) {
          const cellAbove = board[currRowIndex][colIndex]
          if (cellAbove !== null) break
          currRowIndex -= 1
        }
        mergedCells.push([currRowIndex, colIndex])
      }
    })
  }
  shiftCellsUp(board)
  return [board, mergedCells]
}
function shiftCellsDown(board: Board) {
  for (let rowIndex = board.length - 2; rowIndex >= 0; rowIndex--) {
    const row = board[rowIndex]
    row.forEach((cell, colIndex) => {
      if (cell === null) return
      let i = rowIndex + 1
      for (i; i <= board.length - 1; i++) {
        const cellBelow = board[i][colIndex]
        if (cellBelow !== null) {
          board[rowIndex][colIndex] = null
          board[i - 1][colIndex] = cell
          break
        }
        if (i === board.length - 1) {
          board[rowIndex][colIndex] = null
          board[i][colIndex] = cell
        }
      }
    })
  }
}
function moveDown(board: Board): [Board, [number, number][]] {
  const mergedCells: [number, number][] = []
  shiftCellsDown(board)
  for (let rowIndex = board.length - 2; rowIndex >= 0; rowIndex--) {
    const row = board[rowIndex]
    row.forEach((cell, colIndex) => {
      if (cell === null) return
      if (cell === board[rowIndex + 1][colIndex]) {
        board[rowIndex + 1][colIndex] = cell * 2
        board[rowIndex][colIndex] = null
        let currRowIndex = rowIndex
        while (currRowIndex < board.length) {
          const cellBelow = board[currRowIndex][colIndex]
          if (cellBelow !== null) break
          currRowIndex += 1
        }
        mergedCells.push([currRowIndex, colIndex])
      }
    })
  }
  shiftCellsDown(board)
  return [board, mergedCells]
}
function shiftCellsLeft(board: Board) {
  board.forEach((row, rowIndex) => {
    for (let colIndex = 1; colIndex < board[0].length; colIndex++) {
      const cell = row[colIndex]
      if (cell === null) continue
      let i = colIndex - 1
      for (i; i >= 0; i--) {
        const cellLeft = row[i]
        if (cellLeft !== null) {
          board[rowIndex][colIndex] = null
          board[rowIndex][i + 1] = cell
          break
        }
        if (i === 0) {
          board[rowIndex][colIndex] = null
          board[rowIndex][i] = cell
        }
      }
    }
  })
}
function moveLeft(board: Board): [Board, [number, number][]] {
  const mergedCells: [number, number][] = []
  shiftCellsLeft(board)
  board.forEach((row, rowIndex) => {
    for (let colIndex = 1; colIndex < board[0].length; colIndex++) {
      const cell = row[colIndex]
      if (cell === null) continue
      if (cell === row[colIndex - 1]) {
        board[rowIndex][colIndex - 1] = cell * 2
        board[rowIndex][colIndex] = null
        let currColIndex = colIndex
        while (currColIndex > 0) {
          const cellLeft = board[rowIndex][currColIndex]
          if (cellLeft !== null) break
          currColIndex -= 1
        }
        mergedCells.push([rowIndex, currColIndex])
      }
    }
  })
  shiftCellsLeft(board)
  return [board, mergedCells]
}
function shiftCellsRight(board: Board) {
  board.forEach((row, rowIndex) => {
    for (let colIndex = board[0].length - 2; colIndex >= 0; colIndex--) {
      const cell = row[colIndex]
      if (cell === null) continue
      let i = colIndex + 1
      for (i; i < board.length; i++) {
        const cellRight = row[i]
        if (cellRight !== null) {
          board[rowIndex][colIndex] = null
          board[rowIndex][i - 1] = cell
          break
        }
        if (i === board.length - 1) {
          board[rowIndex][colIndex] = null
          board[rowIndex][i] = cell
        }
      }
    }
  })
}
function moveRight(board: Board): [Board, [number, number][]] {
  const mergedCells: [number, number][] = []
  shiftCellsRight(board)
  board.forEach((row, rowIndex) => {
    for (let colIndex = board[0].length - 2; colIndex >= 0; colIndex--) {
      const cell = row[colIndex]
      if (cell === null) continue
      if (cell === row[colIndex + 1]) {
        board[rowIndex][colIndex + 1] = cell * 2
        board[rowIndex][colIndex] = null
        let currColIndex = colIndex
        while (currColIndex < board[0].length) {
          const cellRight = board[rowIndex][currColIndex]
          if (cellRight !== null) break
          currColIndex += 1
        }
        mergedCells.push([rowIndex, currColIndex])
      }
    }
  })
  shiftCellsRight(board)
  return [board, mergedCells]
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
