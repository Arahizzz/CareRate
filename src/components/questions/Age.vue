<template>
  <q-form @submit="handleAnswer">
    <div class="column items-center">
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
        'text-align': 'center',
        'width' : '100px'
      }"
        :rules="[ val => val >= 0 && val < 150 || 'Please enter correct age']"
        dense
      />
      <q-btn class="button" style="margin-top:10px" outline color="primary" type="submit">Submit</q-btn>
    </div>
  </q-form>
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

  handleAnswer () {
    this.$emit('answered', { answer: this.answer, askForExplanation: false })
  }

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => { answer: number } | undefined;

  answer = 0;

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer ?? 0
  }
}
</script>
