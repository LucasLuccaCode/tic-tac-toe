import { useContext } from "react"
import Board from "./components/Board"
import { StateContext } from "./contexts/StateProvider"

function App() {
  const { msg } = useContext(StateContext)

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>{msg}</h2>
      <Board />
    </div>
  )
}

export default App
