import { useState } from 'react'
import Board from "./components/Board"

function App() {
  const [endGame, setEndGame] = useState(false)
  const defaultState = {
    squares: Array(9).fill(null),
    winningSquares: [],
    isXNext: true,
  }

  const [state, setState] = useState(defaultState)

  const checkWinner = squares => {
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

  const handleSquare = indexSquare => {
    if (endGame) return
    const newSquares = state.squares.slice()
    newSquares[indexSquare] = state.isXNext ? "X" : "O"
    const newWinningSquares = checkWinner(newSquares) || []
    if (newWinningSquares.length) setEndGame(true)

    setState({
      squares: newSquares,
      winningSquares: newWinningSquares,
      isXNext: !state.isXNext,
    })
  }

  const restartGame = () => {
    setState(defaultState)
    setEndGame(false)
  }

  const getMessage = () => {
    const { squares, winningSquares, isXNext } = state
    const totalWinningSquares = winningSquares.length
    const allSquaresFilled = squares.every(value => value)

    if (!totalWinningSquares && !allSquaresFilled)
      return `Vez do jogador ${isXNext ? "X" : "O"} jogar...`

    if (totalWinningSquares)
      return `Jogador ${squares[winningSquares[0]]} venceu...`

    if (!totalWinningSquares && allSquaresFilled) {
      !endGame && setEndGame(true)
      return `Jogo terminou empatado...`
    }
  }

  const msg = getMessage()

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>

      <h2>{msg}</h2>
      <Board state={state} restartGame={restartGame} handleSquare={handleSquare} />
    </div>
  )
}

export default App
