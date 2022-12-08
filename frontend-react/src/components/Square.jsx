import { useContext } from "react"
import { StateContext } from "../contexts/StateProvider"

export default function Square ({ value, index }){
  const { state, handleSquare } = useContext(StateContext)

  const hasWinner = state.winningSquares.includes(index)
  const className = hasWinner ? "square winner" : "square"

  return (
    <li className={className} onClick={() => handleSquare(index)}>
      {value}
    </li>
  )
}