import Square from "./Square"

export default function Board({ state, handleSquare, restartGame }) {
  return (
    <div className="board">
      <ul>
        {
          state.squares.map((square, index) =>
            <Square
              key={index}
              value={square}
              handleSquare={() => handleSquare(index)}
              winner={state.winningSquares.includes(index)}
            />)
        }
      </ul>
      <button onClick={restartGame}>Reiniciar jogo</button>
    </div>
  )
}