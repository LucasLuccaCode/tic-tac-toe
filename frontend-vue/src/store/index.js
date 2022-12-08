import { createStore } from "vuex";

const initialStore = {
  squares: Array(9).fill(null),
  winningSquares: [],
  isXNext: true,
  endGame: false
}

export default createStore({
  state: { ...initialStore },
  getters: {
    msg(state) {
      const { squares, winningSquares, isXNext } = state;
      const totalWinningSquares = winningSquares.length;
      const allSquaresFilled = squares.every((value) => value);

      if (!totalWinningSquares && !allSquaresFilled)
        return `Vez do jogador ${isXNext ? "X" : "O"} jogar...`;

      if (totalWinningSquares)
        return `Jogador ${squares[winningSquares[0]]} venceu...`;

      if (!totalWinningSquares && allSquaresFilled) {
        return `Jogo terminou empatado...`;
      }
    },
  },
  mutations: {
    setState(state, payload) {
      const { squares, winningSquares, isXNext, endGame } = payload
      state.squares = squares
      state.winningSquares = winningSquares
      state.isXNext = isXNext
      state.endGame = endGame
      console.log(squares, winningSquares)
    },
    resetState(state) {
      const { squares, winningSquares, isXNext, endGame } = initialStore
      state.squares = squares
      state.winningSquares = winningSquares
      state.isXNext = isXNext
      state.endGame = endGame
    }
  },
  actions: {
    async handleSquare({ state, commit, dispatch }, indexSquare) {
      const { squares, isXNext, endGame } = state;
      if (endGame) return;
      const newSquares = squares.slice();
      newSquares[indexSquare] = isXNext ? "X" : "O";
      const newWinningSquares = await dispatch("getSquaresWinner", newSquares);

      const newState = {
        squares: newSquares,
        winningSquares: newWinningSquares,
        isXNext: !isXNext,
        endGame: Boolean(newWinningSquares.length)
      };
      commit("setState", newState)
    },
    getSquaresWinner(context, newSquares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i];
        const currentLineValues = currentLine.map((value) => newSquares[value]);
        const firstValueCurrentLine = newSquares[currentLine[0]];

        if (
          firstValueCurrentLine &&
          currentLineValues.every((value) => value === firstValueCurrentLine)
        )
          return currentLine;
      }
      return []
    },
    restartGame({ commit }) {
      commit("resetState")
    },
  }
})