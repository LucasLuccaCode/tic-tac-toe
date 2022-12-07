<template>
  <div class="board">
    <h2>Board</h2>
  </div>
</template>

<script>
export default {
  name: "Board",
};
</script>

<style scoped>
.board ul {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  gap: .7rem;
  margin-top: 1rem;
}
</style>
