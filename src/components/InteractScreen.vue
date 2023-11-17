<template lang="html">
  <div class="screen">
    <button @click="onBackMainScreen()">↩ Back</button>
    <div class="screen-inner">
      <card-flip
        v-for="(card, index) in cardsContext"
        :key="index"
        :isNewLine="(index + 1) % numberItemsOnRow"
        :ref="`card-${index}`"
        :imgBackFaceUrl="`images/${card}.png`"
        :card="{ key: index, value: card }"
        :cardHeight="
          this.cardHeight > this.cardHeightDefault
            ? this.cardHeightDefault
            : this.cardHeight
        "
        @onFlip="checkRule($event)"
      ></card-flip>
    </div>
  </div>
</template>
<script>
import CardFlip from "./Card.vue";
export default {
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
    totalBlocks: {
      type: Number,
      require: true,
    },
  },
  components: {
    CardFlip,
  },
  data() {
    return {
      flippedCards: [],
      score: 0,
      scoreToFinish: this.totalBlocks / 2,
      numberItemsOnRow: Math.sqrt(this.totalBlocks),
      cardHeight: (window.innerHeight - 32) / Math.sqrt(this.totalBlocks) - 19,
      cardHeightDefault: 120,
    };
  },
  methods: {
    checkRule(card) {
      let flippedCardsLength = this.flippedCards.length;
      if (flippedCardsLength > 1) {
        return false;
      }
      this.flippedCards = [...this.flippedCards, card];
      flippedCardsLength = this.flippedCards.length;
      if (flippedCardsLength === 1) {
        return false;
      }
      if (
        flippedCardsLength === 2 &&
        this.flippedCards[0].value === this.flippedCards[1].value &&
        this.flippedCards[0].key !== this.flippedCards[1].key
      ) {
        //logic when click two same cards, case true
        this.score += 1;
        //logic finish
        if (this.score === this.scoreToFinish) {
          const finishedAt = new Date().getTime();
          setTimeout(() => {
            this.$emit("onFinish", finishedAt);
          }, 1000);
        }
        //disable click card
        this.$refs[`card-${this.flippedCards[0].key}`][0].onDisableClickCard();
        this.$refs[`card-${this.flippedCards[1].key}`][0].onDisableClickCard();

        this.flippedCards = [];
      } else {
        //logic when click on two different cards or double-click on one card, case false
        setTimeout(() => {
          //close card
          this.$refs[`card-${this.flippedCards[0].key}`][0].onCloseCard();
          this.$refs[`card-${this.flippedCards[1].key}`][0].onCloseCard();
          //reset flippedCards
          this.flippedCards = [];
        }, 500);
      }
    },
    onBackMainScreen() {
      this.$emit("onBackMainScreen");
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

.screen-inner {
  margin-top: 1rem;
}

button {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
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
</style>
