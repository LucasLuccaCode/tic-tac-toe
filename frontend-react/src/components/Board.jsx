import { useContext } from "react"
import { StateContext } from "../contexts/StateProvider"
import Square from "./Square"

export default function Board() {
  const { state, restartGame } = useContext(StateContext)

  return (
    <div className="board">
      <ul>
        {
          state.squares.map((square, index) =>
            <Square
              key={index}
              value={square}
              index={index}
            />)
        }
      </ul>
      <button onClick={restartGame}>Reiniciar jogo</button>
    </div>
  )
}