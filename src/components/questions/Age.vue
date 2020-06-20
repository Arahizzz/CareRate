<template>
  <q-input
    v-model.number="answer"
    type="number"
    input-type="number"
    :input-style="{
        'font-family': 'PP Woodland',
        'font-style': 'normal',
        'font-weight': 'bold',
        'font-size' : '40px',
        'line-height': '150%',
        'text-align': 'center'
 }"
 @change="handleAnswer"
    dense
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class Age extends Vue {
  @Prop({ default: '' })
  id!: string

  handleAnswer (newAnswer: number) {
    this.answer = newAnswer
    this.$emit('answered', this.answer)
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => number | undefined;

  answer = 0;

  mounted () {
    this.answer = this.answerGetter(this.id) ?? 0
  }
}
</script>
