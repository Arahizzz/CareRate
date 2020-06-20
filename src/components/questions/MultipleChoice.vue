<template>
  <div class="q-pa-lg">
    <q-option-group v-model="answer" :options="getButtonLabels()" color="primary" type="checkbox"
    @input="handleAnswer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { TranslatedQuestionOption } from '../../../Models/Question/TranslatedQuestion'
import { SelectedAnswer } from '../../../Models/Question/SelectedAnswer'
const namespace = 'profile'
@Component
export default class MultipleChoice extends Vue {
  @Prop({ default: '' })
  id!: string

  @Prop({ default: [] })
  options!: TranslatedQuestionOption[]

  handleAnswer (newAnswer: SelectedAnswer[]) {
    const askForExplanation = newAnswer.map((ans) => this.options[ans.index].askForExplanation).includes(true)
    this.$emit('answered', newAnswer, askForExplanation)
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => {answer: SelectedAnswer[]} | undefined;

  getButtonLabels () {
    return this.options.forEach((opt, index) => { return { label: opt.title, value: { index, text: opt.title } } })
  }

  answer: SelectedAnswer[] = [];

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? []
  }
}
</script>
