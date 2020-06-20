<template>
  <q-slider
      v-model="answer"
      :min="min"
      :max="max"
      :step="1"
       label
      label-always
      color="deep-orange"
      @change="handleAnswer"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class Slider extends Vue {
  @Prop({ default: '' })
  id!: string

  @Prop({ default: 0 })
  min!: number

  @Prop({ default: 10 })
  max!: number

  handleAnswer (newAnswer: number) {
    this.answer = newAnswer
    this.$emit('answered', this.answer)
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => {answer: number} | undefined;

  answer = 0;

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? 5
  }
}
</script>
