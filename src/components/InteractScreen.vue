<template lang="">
  <div class="screen">
    <h1>Interact Screen</h1>
    <div align="center" v-if="!isFinished">
      <card-flip
        v-for="(card, index) in cardsContext"
        :key="index"
        :isNewLine="(index + 1) % numberItemsOnRow"
        :ref="`card-${index}`"
        :imgBackFaceUrl="`images/${card}.png`"
        :card="{ key: index, value: card }"
        @onFlip="checkRule($event)"
      ></card-flip>
    </div>
    <h1 v-if="isFinished">Your Time you need to finish: {{ timeToFinish }}s</h1>
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
    gameStartedAt: {
      type: Number,
      require: true,
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
      isFinished: false,
      timeToFinish: 0,
      numberItemsOnRow: Math.sqrt(this.totalBlocks),
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
        if (this.score === this.scoreToFinish) {
          const finishedAt = new Date().getTime();
          this.timeToFinish = Math.floor(
            (finishedAt - this.gameStartedAt) / 1000
          );
          setTimeout(() => {
            this.isFinished = true;
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
  },
};
</script>
<style lang=""></style>
