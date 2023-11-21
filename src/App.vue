<template>
  <main-screen
    v-if="statusMatch === matchStatus.default"
    @onStart="onHandleBeforeStart($event)"
  ></main-screen>
  <interact-screen
    v-if="statusMatch === matchStatus.match"
    :cardsContext="settings.cardsContext"
    :totalBlocks="settings.totalBlocks"
    @onFinish="onShowResult($event)"
    @onBackMainScreen="statusMatch = matchStatus.default"
  ></interact-screen>
  <result-screen
    v-if="statusMatch === matchStatus.result"
    :timeToFinish="settings.timeToFinish"
    :bestTimeToFinish="settings.bestTimeToFinish"
    @onRestart="statusMatch = matchStatus.default"
  ></result-screen>
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";
import { shuffle, randomNumber } from "./helpers/array";
import { DEFAULT, MATCH, RESULT } from "./enums/matchStatus";
export default {
  name: "App",
  data() {
    return {
      statusMatch: DEFAULT,
      matchStatus: {
        default: DEFAULT,
        match: MATCH,
        result: RESULT,
      },
      settings: {
        totalBlocks: 0,
        cardsContext: [],
        startedAt: null,
        timeToFinish: 0,
        bestTimeToFinish: null,
      },
    };
  },
  methods: {
    onHandleBeforeStart(config) {
      this.settings.totalBlocks = config.totalBlocks;
      const arrayLength = config.totalBlocks / 2;
      const randNumber = randomNumber(1, 848);
      const firstCards = Array.from(
        { length: arrayLength },
        (v, i) => i + randNumber
      );
      const secondCards = [...firstCards];
      let totalCards = [...firstCards, ...secondCards];
      totalCards = shuffle(totalCards, 4);
      this.settings.cardsContext = totalCards;
      this.settings.startedAt = new Date().getTime();
      // data ready
      this.statusMatch = MATCH;
    },
    onShowResult(finishedAt) {
      const bestTimeMode = "bestTimeToFinish" + this.settings.totalBlocks;
      const bestTimeToFinish = localStorage.getItem(bestTimeMode);
      this.settings.timeToFinish = Math.round(
        (finishedAt - this.settings.startedAt) / 1000
      );
      if (!bestTimeToFinish || bestTimeToFinish > this.settings.timeToFinish) {
        localStorage.setItem(bestTimeMode, this.settings.timeToFinish);
      }
      this.settings.bestTimeToFinish = localStorage.getItem(bestTimeMode);
      // data ready
      this.statusMatch = RESULT;
    },
  },
  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
  },
};
</script>
