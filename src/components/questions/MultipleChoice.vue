<template>
  <div class="q-pa-lg">
    <p class="fontsize-14 choose-info">choose as many as you want</p>
    <multi-choice :options="getButtonLabels()" v-model="answer" @input="handleAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { TranslatedQuestionOption } from '../../../Models/Question/TranslatedQuestion'
import MultiChoiceButtonGroup from './buttonGroups/MultipleChoiceButtonGroup.vue'

Vue.component('multi-choice', MultiChoiceButtonGroup)
const namespace = 'profile'
@Component
export default class MultipleChoice extends Vue {
  @Prop({ default: '' })
  id!: string

  @Prop({ default: [] })
  options!: TranslatedQuestionOption[]

  handleAnswer (answer: number[]) {
    const askForExplanation = answer.map((ans) => this.options[ans].askForExplanation).includes(true)
    this.$emit('answered', { answer: answer, askForExplanation })
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => { answer: number[] } | undefined;

  getButtonLabels () {
    return this.options.map((opt, index) => { return { label: opt.title, value: index } })
  }

  answer: number[] = [];

  created () {
    this.answer = this.answerGetter(this.id)?.answer ?? []
  }
}
</script>

<style lang="stylus" scoped>
.choose-info {
  font-family: PP Woodland;
  font-weight: 250;
}
</style>
