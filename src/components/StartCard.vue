<template>
  <div v-if="info != null">
    <h2 class="fontsize-24 title">{{info.title}}</h2>
    <div>
      <q-img
        src="~assets/globe.png"
        spinner-color="white"
        style="height: 40px; max-width: 40px;"
      />
      <q-btn  v-for="lang in languages" flat :color="lang.cultureInfoCode===language?'blue':'primary'" :key="lang.cultureInfoCode" style="height:40px; margin-left:10px" @click="()=>setLanguage(lang.cultureInfoCode)">
        {{lang.cultureInfoCode}}
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          <strong>{{lang.description}}</strong>
        </q-tooltip>
      </q-btn>
    </div>
    <div class="description fontsize-14" v-if="info.description != null" v-html="info.description"/>
    <div class="row">
      <q-space />
      <q-btn flat class="fontsize-36" id="start-button" label="Start" @click="start" />
    </div>
  </div>
  <div class="row justify-center" v-else>
    <q-spinner color="primary" size="3em" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { TranslatedStartPage } from 'src/Models/TranslatedStartPage'
import { Culture } from 'src/Models/Culture'
import { Action, Getter } from 'vuex-class'

const namespace = 'profile'
@Component
export default class StartCard extends Vue {
  @Getter('languages', { namespace })
  languages!: Culture;

  @Getter('language', { namespace })
  language!: string;

  @Action('setLanguage', { namespace })
  setLanguage!: (lang: string) => void;

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
  line-height: 150%;
  color: #040233;
}

#start-button {
  /* title */
  font-family: "Monument Extended";
  font-style: normal;
  font-weight: normal;
  line-height: 50%;

  /* identical to box height, or 120px */
  text-align: center;

  /* accent */
  color: #ff3908;
}
</style>
