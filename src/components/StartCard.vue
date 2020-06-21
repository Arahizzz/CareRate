<template>
  <div v-if="info != null">
    <h2 class="title">{{info.title}}</h2>
    <p class="description" v-if="info.description != null">{{info.description}}</p>
    <div class="row">
      <q-space />
      <q-btn flat id="start-button" label="Start" @click="start" />
    </div>
  </div>
  <div class="row justify-center" v-else>
    <q-spinner color="deep-orange" size="3em" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { TranslatedStartPage } from 'Models/TranslatedStartPage'

@Component
export default class StartCard extends Vue {
  @Prop()
  info!: TranslatedStartPage | null;

  @Prop()
  start!: void;
}
</script>

<style scoped>
.description {
  font-family: "PP Woodland";
  font-style: normal;
  font-weight: 250;
  font-size: 20px;
  line-height: 150%;
  color: #040233;
}

@media (max-width: 600px) {
  .description {
    font-size: 16px;
  }
}

#start-button {
  /* title */
  font-family: "Monument Extended";
  font-style: normal;
  font-weight: normal;
  font-size: 80px;
  line-height: 50%;

  /* identical to box height, or 120px */
  text-align: center;

  /* accent */
  color: #ff3908;
}
</style>
