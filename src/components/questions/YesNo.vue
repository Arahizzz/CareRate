<template>
<div class="q-pa-md q-gutter-sm">
  <q-btn class="options" :color="answer === true ? 'accent' : 'primary'" round outline label="Yes" size="xl" @click="()=>{handleAnswer(true)}"/>
  <q-btn class="options" :color="answer === false ? 'accent' : 'primary'" round outline label="No"  size="xl" @click="()=>{handleAnswer(false)}"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class YesNo extends Vue {
  @Prop({ default: '' })
  id!: string

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => {answer: boolean | null} | undefined;

  answer: boolean | null = null;

  handleAnswer (newAnswer: boolean) {
    this.$emit('answered', { answer: newAnswer, askForExplanation: false })
    this.answer = newAnswer
  }

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? null
  }
}
</script>

<style lang="stylus" scoped>
.options {
  font-family: PP Woodland;
  font-weight: bold;
}
</style>
