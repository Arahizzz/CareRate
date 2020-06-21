<template>
  <div class="q-pa-lg">
    <p class="choose-info">choose as many as you want</p>
    <q-option-group class="options"
      v-model="answer"
      :options="getButtonLabels()"
      color="deep-orange"
      type="checkbox"
      @input="handleAnswer"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { TranslatedQuestionOption } from '../../../Models/Question/TranslatedQuestion'
const namespace = 'profile'
@Component
export default class MultipleChoice extends Vue {
  @Prop({ default: '' })
  id!: string

  @Prop({ default: [] })
  options!: TranslatedQuestionOption[]

  handleAnswer () {
    const askForExplanation = this.answer.map((ans) => this.options[ans].askForExplanation).includes(true)
    this.$emit('answered', { answer: this.answer, askForExplanation })
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => { answer: number[] } | undefined;

  getButtonLabels () {
    return this.options.map((opt, index) => { return { label: opt.title, value: index } })
  }

  answer: number[] = [];

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? []
  }
}
</script>
