<template>
  <h1>Square</h1>
</template>

<script>
export default {
  name: "Square"
};
</script>

<style scoped>
.square {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary-color);
  width: 50px;
  height: 50px;
  border-radius: .2rem;
  border: 1px solid rgba(255, 255, 255, .1);
  color: cyan;
  font-size: .8rem;
  font-weight: bold;
  transition: .3s;
}

.square:hover {
  background: rgba(255, 255, 255, .2);
}

.square.winner {
  background: rgba(0, 177, 255, .6);
  color: #ffffff;
}
</style>