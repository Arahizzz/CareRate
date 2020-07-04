<template>
<div style="width:100%;display:flex; justify-content:center">
  <q-input
    v-model="answer"
    mask="# # # #"
    fill-mask="_"
    :input-style="{ 'font-size': fontSizePx+'px', 'height':fontSizePx,'max-width':fontSizePx*3 + 'px' }"
    borderless
    dense
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class FreeText extends Vue {
  @Prop({ default: '' })
  id!: string

  fontSizePx = 50;
  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => {answer: string} | undefined;;

  answer = '';

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? ''
  }
}
</script>
