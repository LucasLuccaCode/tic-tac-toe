<template>
  <div class="board">
    <ul>
      <Square 
        v-for="(square, index) in squares"
        :key="index" 
        :value="square"
        :index="index"
      />
    </ul>
    <button @click="restartGame">Reiniciar jogo</button>
  </div>
</template>

<script>
import Square from "./Square.vue"

export default {
  name: "Board",
  methods: {
    restartGame(){
      this.$store.dispatch("restartGame")
    }
  },
  computed: {
    squares(){
      return this.$store.state.squares
    }
  },
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
