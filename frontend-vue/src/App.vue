<template>
  <div class="game">
    <h1>Tic Tac Toe</h1>
    <h2>{{ msg }}</h2>
    <Board />
  </div>
</template>

<script>
import Board from "@/components/Board.vue";

export default {
  name: "App",
  computed: {
    msg(){
      return this.$store.getters.msg
    }
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
