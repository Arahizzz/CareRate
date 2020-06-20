<template>
<div class="q-pa-lg">
    <q-option-group
      v-model="answer"
      :options="getButtonLabels()"
      color="deep-orange"
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
export default class SingleChoice extends Vue {
  @Prop({ default: '' })
  id!: string

    @Prop({ default: [] })
    options!: TranslatedQuestionOption[]

    handleAnswer () {
      if (this.answer) {
        this.$emit('answered', this.answer, this.options[this.answer].askForExplanation)
      }
    }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => {answer: number } | undefined;

  getButtonLabels () {
    return this.options.map((opt, index) => { return { label: opt.title, value: index } })
  }

  answer: number | null = null;

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? null
  }
}
</script>
