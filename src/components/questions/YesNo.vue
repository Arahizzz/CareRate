<template>
<div class="q-pa-md q-gutter-sm">
  <q-btn :color="answer == 'Yes' ? 'primary' : 'deep-orange'" round outline label="Yes" size="xl" @click="()=>{handleAnswer('Yes')}"/>
  <q-btn :color="answer == 'No' ? 'primary' : 'deep-orange'" round outline label="No"  size="xl" @click="()=>{handleAnswer('No')}"/>
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
  answerGetter: any;

  answer = '';

  handleAnswer (newAnswer: string) {
    this.$emit('answered', newAnswer)
    this.answer = newAnswer
  }

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer
  }
}
</script>
