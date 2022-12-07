<template>
  <div class="board">
    <ul>
      <Square 
        v-for="(square, index) in state.squares"
        :key="index" 
        :value="square"
        :handleSquare="() => handleSquare(index)"
        :winner="state.winningSquares.includes(index)" 
      />
    </ul>
    <button @click="restartGame">Reiniciar jogo</button>
  </div>
</template>

<script>
import Square from "./Square.vue"

export default {
  name: "Board",
  props: ["state", "handleSquare", "restartGame"],
  components: {
    Square 
  }
};
</script>

<style scoped>
.board ul {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  gap: 0.7rem;
  margin-top: 1rem;
}
</style>
