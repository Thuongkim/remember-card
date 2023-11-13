<template>
  <main-screen
    v-if="statusMatch === matchStatus.default"
    @onStart="onHandleBeforeStart($event)"
  ></main-screen>
  <interact-screen
    v-if="statusMatch === matchStatus.match"
    :cardsContext="settings.cardsContext"
    :gameStartedAt="settings.startedAt"
    :totalBlocks="settings.totalBlocks"
  ></interact-screen>
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import { shuffle } from "./helpers/array";
import { DEFAULT, MATCH } from "./enums/matchStatus";
export default {
  name: "App",
  data() {
    return {
      statusMatch: DEFAULT,
      matchStatus: {
        default: DEFAULT,
        match: MATCH,
      },
      settings: {
        totalBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
    };
  },
  methods: {
    onHandleBeforeStart(config) {
      this.settings.totalBlocks = config.totalBlocks;
      const arrayLength = config.totalBlocks / 2;
      const firstCards = Array.from({ length: arrayLength }, (v, i) => i + 1);
      const secondCards = [...firstCards];
      let totalCards = [...firstCards, ...secondCards];
      totalCards = shuffle(totalCards, 4);
      this.settings.cardsContext = totalCards;
      this.settings.startedAt = new Date().getTime();

      // data ready
      this.statusMatch = MATCH;
    },
  },
  components: {
    MainScreen,
    InteractScreen,
  },
};
</script>
