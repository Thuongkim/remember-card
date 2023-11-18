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
      },
    };
  },
  methods: {
    onHandleBeforeStart(config) {
      this.settings.totalBlocks = config.totalBlocks;
      const arrayLength = config.totalBlocks / 2;
      const randNumber = randomNumber(1, 14);
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
      this.settings.timeToFinish = Math.round(
        (finishedAt - this.settings.startedAt) / 1000
      );
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
