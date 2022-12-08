import { createContext, useCallback, useState } from "react"

export const StateContext = createContext(null)

const initialContext = {
  squares: Array(9).fill(null),
  winningSquares: [],
  isXNext: true,
  endGame: false
}

export default function StateProvider({ children }) {
  const [state, setState] = useState(initialContext)

  const handleSquare = useCallback(indexSquare => {
    const { squares, isXNext, endGame } = state
    if (endGame) return
    const newSquares = squares.slice()
    newSquares[indexSquare] = isXNext ? "X" : "O"
    const newWinningSquares = checkWinner(newSquares) || []

    setState({
      squares: newSquares,
      winningSquares: newWinningSquares,
      isXNext: !state.isXNext,
      endGame: newWinningSquares.length ? true : false
    })
  }, [state])

  const restartGame = () => {
    setState(initialContext)
  }

  const msg = getMessage(state, setState)


  return (
    <StateContext.Provider value={{ state, handleSquare, restartGame, msg }}>
      {children}
    </StateContext.Provider>
  )
}

function getMessage(state, setState) {
  const { squares, winningSquares, isXNext, endGame } = state
  const totalWinningSquares = winningSquares.length
  const allSquaresFilled = squares.every(value => value)

  if (!totalWinningSquares && !allSquaresFilled)
    return `Vez do jogador ${isXNext ? "X" : "O"} jogar...`

  if (totalWinningSquares)
    return `Jogador ${squares[winningSquares[0]]} venceu...`

  if (!totalWinningSquares && allSquaresFilled) {
    !endGame && setState(prevState => ({ ...prevState, endGame: true }))
    return `Jogo terminou empatado...`
  }
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i]
    const currentLineValues = currentLine.map(value => squares[value])
    const firstValueCurrentLine = squares[currentLine[0]]

    if (firstValueCurrentLine && currentLineValues.every(value => value === firstValueCurrentLine))
      return currentLine
  }
}