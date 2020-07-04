<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      class="fontsize-12 options"
      v-for="i in 10"
      :key="i"
      :color="answer==i+''?'primary':'deep-orange'"
      @click="()=>{handleAnswer(i+'')}"
      round
      outline
      :label="i"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class Rating extends Vue {
  @Prop({ default: '' })
  id!: string

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => {answer: string} | undefined;;

  answer = '';

  handleAnswer (newAnswer: string) {
    this.answer = newAnswer
    this.$emit('answered', { answer: this.answer, askForExplanation: false })
  }

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? ''
  }
}
</script>

<style lang="stylus" scoped>
.options {
  font-family: PP Woodland;
  font-weight: bold;
}
</style>
