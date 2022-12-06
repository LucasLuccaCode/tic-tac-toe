export default function Square ({ value, handleSquare, winner }){
  return (
    <li className={`square ${winner ? "winner" : ""}`} onClick={handleSquare}>
      {value}
    </li>
  )
}