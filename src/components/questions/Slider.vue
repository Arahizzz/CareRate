<template>
  <div class="column">
    <p class="fontsize-36 slider-val">{{answer}}</p>
    <q-slider
      v-model="answer"
      :min="min"
      :max="max"
      :step="1"
      color="deep-orange"
      @change="handleAnswer"
    />
  </div>
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
    this.$emit('answered', newAnswer)
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => { answer: number } | undefined;

  answer = 0;

  created () {
    this.answer = this.answerGetter(this.id)?.answer ?? this.max / 2
  }
}
</script>

<style lang="stylus" scoped>
.slider-val {
  font-family: PP Woodland;
  font-weight: bold;
  color: $deep-orange;
}
</style>
