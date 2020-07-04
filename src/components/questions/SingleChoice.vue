<template>
  <div class="q-pa-lg">
    <p class="fontsize-14 choose-info">choose one</p>
    <single-choice-buttons :options="getButtonLabels()" v-model="answer" @input="handleAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { TranslatedQuestionOption } from 'src/Models/Question/TranslatedQuestion'
import SingleChoiceButtonGroup from './buttonGroups/SingleChoiceButtonGroup.vue'

Vue.component('single-choice-buttons', SingleChoiceButtonGroup)

const namespace = 'profile'
@Component
export default class SingleChoice extends Vue {
  @Prop({ default: '' })
  id!: string

  @Prop({ default: () => [] })
  options!: TranslatedQuestionOption[]

  handleAnswer (answer: number) {
    this.$emit('answered', { answer: answer, askForExplanation: this.options[answer].askForExplanation })
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => { answer: number } | undefined;

  getButtonLabels () {
    return this.options.map((opt, index) => { return { label: opt.title, value: index } })
  }

  answer: number | null = null;

  created () {
    this.answer = this.answerGetter(this.id)?.answer ?? null
  }
}
</script>

<style lang="stylus" scoped>
.choose-info {
  font-family : PP Woodland;
  font-weight: 250;
}
</style>
