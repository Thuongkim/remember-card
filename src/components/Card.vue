<template>
  <div
    class="card"
    :class="{ disable: isDisable }"
    :style="{
      height: `${cardHeightResize}px`,
      width: `${cardWidth}px`,
    }"
  >
    <div
      class="card__inner"
      @click="onToggleCard()"
      :class="{ 'is-flipped': isFlipped }"
    >
      <div class="card__face card__face--front">
        <div
          class="card__content"
          :style="{
            backgroundSize: `${cardHeightResize / 4}px ${
              cardHeightResize / 4
            }px`,
          }"
        ></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{
            backgroundImage: `url(${require('@/assets/' + imgBackFaceUrl)})`,
            backgroundSize: `${cardHeightResize / 2}px ${
              cardHeightResize / 2
            }px`,
          }"
        ></div>
      </div>
    </div>
  </div>
  <br v-if="isNewLine === 0" />
</template>
<script>
export default {
  props: {
    imgBackFaceUrl: {
      type: String,
      require: true,
    },
    isNewLine: {
      type: Number,
      require: true,
    },
    card: {
      type: [Number, String, Object, Array],
    },
    cardHeight: {
      type: Number,
      require: true,
    },
    cardWidth: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      isFlipped: false,
      isDisable: false,
      cardHeightResize:
        this.cardHeight > this.cardWidth * 1.34
          ? this.cardWidth * 1.34
          : this.cardHeight,
    };
  },
  emits: {
    onFlip: null,
  },
  methods: {
    onToggleCard() {
      if (this.isDisable) {
        return false;
      }
      this.isFlipped = !this.isFlipped;
      if (this.isFlipped) {
        this.$emit("onFlip", this.card);
      }
    },
    onCloseCard() {
      this.isFlipped = false;
    },
    onDisableClickCard() {
      this.isDisable = true;
    },
  },
};
</script>
<style lang="css" scoped>
.card {
  display: inline-block;
  margin: 0 1rem 1rem 0;
  width: 90px;
}

.card.disable .card__inner {
  cursor: default;
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}
.card__inner.is-flipped {
  transform: rotateY(-180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
}
.card__face--back {
  background-color: var(--light);
  transform: rotateY(-180deg);
}

.card__face--front {
  border: 2px solid black;
}

.card__face--front .card__content {
  background-image: url(../assets/images/icon_back.png);
  background-repeat: no-repeat;
  background-position: center center;
  /* background-size: 40px 40px; */
  width: 100%;
  height: 100%;
}
.card__face--back .card__content {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  width: 100%;
  height: 100%;
}
</style>
