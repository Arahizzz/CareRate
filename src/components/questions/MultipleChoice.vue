<template>
  <div class="q-pa-lg">
    <q-option-group v-model="answer" :options="getButtonLabels()" color="primary" type="checkbox" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { TranslatedQuestionOption } from '../../../Models/Question/TranslatedQuestion'
const namespace = 'profile'
@Component
export default class MultiChoice extends Vue {
  @Prop({ default: '' })
  id!: string

  @Prop({ default: [] })
  options!: TranslatedQuestionOption[]

  handleAnswer () {
    this.$emit('answered', this.answer)
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => string | undefined;

  getButtonLabels () {
    return this.options.map((opt) => { return { label: opt.title, value: opt.title } })
  }

  answer: string[] = [];

  mounted () {
    const ans = this.answerGetter(this.id)
    if (ans) {
      this.answer = [ans]
    } else {
      this.answer = []
    }
  }
}
</script>
