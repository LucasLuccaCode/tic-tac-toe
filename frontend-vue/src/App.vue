<template>
  <div class="game">
    <h1>Tic Tac Toe</h1>

    <h2>{{ msg }}</h2>
    <Board
      :state="state"
      :restartGame="restartGame"
      :handleSquare="handleSquare"
    />
  </div>
</template>

<script>
import Board from "@/components/Board.vue";

const defaultState = {
  squares: Array(9).fill(null),
  winningSquares: [],
  isXNext: true,
};

export default {
  name: "App",
  data() {
    return {
      state: { ...defaultState },
      endGame: false,
      msg: "...",
    };
  },
  methods: {
    getMessage() {
      const { squares, winningSquares, isXNext } = this.state;
      const totalWinningSquares = winningSquares.length;
      const allSquaresFilled = squares.every((value) => value);

      if (!totalWinningSquares && !allSquaresFilled)
        return `Vez do jogador ${isXNext ? "X" : "O"} jogar...`;

      if (totalWinningSquares)
        return `Jogador ${squares[winningSquares[0]]} venceu...`;

      if (!totalWinningSquares && allSquaresFilled) {
        if (!this.endGame) this.endGame = true;
        return `Jogo terminou empatado...`;
      }
    },
    handleSquare(indexSquare) {
      const { squares, isXNext } = this.state;
      if (this.endGame) return;
      const newSquares = squares.slice();
      newSquares[indexSquare] = isXNext ? "X" : "O";
      const newWinningSquares = this.checkWinner(newSquares) || [];
      if (newWinningSquares.length) this.endGame = true;

      this.state = {
        squares: newSquares,
        winningSquares: newWinningSquares,
        isXNext: !isXNext,
      };
    },
    checkWinner(squares) {
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
        const currentLineValues = currentLine.map((value) => squares[value]);
        const firstValueCurrentLine = squares[currentLine[0]];

        if (
          firstValueCurrentLine &&
          currentLineValues.every((value) => value === firstValueCurrentLine)
        )
          return currentLine;
      }
    },
    restartGame() {
      this.state = { ...defaultState };
      this.endGame = false;
    },
  },
  watch: {
    state() {
      this.msg = this.getMessage();
    },
  },
  created() {
    this.msg = this.getMessage();
  },
  components: {
    Board,
  },
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
