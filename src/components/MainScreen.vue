<template lang="html">
  <div class="screen">
    <img src="/logo.png" height="60" />
    <h1>MEMORY CARDS</h1>
    <h3>Select mode to play!</h3>
    <div class="actions">
      <button @click="onStart(16)">
        <span>4x4</span>
        <span>Easy</span>
      </button>
      <button @click="onStart(36)">
        <span>6x6</span>
        <span>Normal</span>
      </button>
      <button @click="onStart(64)">
        <span>8x8</span>
        <span>Hard</span>
      </button>
      <button @click="onStart(100)">
        <span>10x10</span>
        <span>Super Hard</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onStart(totalBlocks) {
      this.$emit("onStart", { totalBlocks });
    },
  },
};
</script>
<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
h1 {
  font-size: 5rem;
}
h3 {
  margin-top: 1.5rem;
  font-size: 3rem;
}
button {
  font: var(--font);
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--light);
  color: var(--light);
  margin: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
button:hover {
  background-color: var(--light);
  color: var(--dark);
}
@media only screen and (max-width: 640px) {
  h1 {
    font-size: 4rem;
  }
  .actions {
    display: flex;
    flex-direction: column;
  }
}
</style>
