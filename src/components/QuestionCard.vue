<template>
  <div>
    <p class="text-h3">{{question.title}}</p>

    <rating v-if="question.questionType===0 || question.questionType===5 || question.questionType===6" ref="question" :id="question.id" @answered="handleAnswer"></rating>
    <yes-no v-else-if="question.questionType===1" ref="question" :id="question.id" @answered="handleAnswer"></yes-no>
    <single-choice v-else-if="question.questionType===2 || question.questionType===6 || question.questionType===10" ref="question" :id="question.id" :options="question.options" @answered="handleAnswer"></single-choice>
    <free-text v-else-if="question.questionType===3 || question.questionType===8 || question.questionType===9" ref="question" :id="question.id" @answered="handleAnswer"></free-text>
    <multiple-choice v-else-if="question.questionType===4" ref="question" :id="question.id" :options="question.options" @answered="handleAnswer"></multiple-choice>
    <post-code v-else-if="question.questionType===11" ref="question" :id="question.id" @answered="handleAnswer"></post-code>
    <age v-else-if="question.questionType===12" ref="question" :id="question.id" @answered="handleAnswer"></age>

    <q-btn v-if="askForExplanation" color="deep-orange" style="margin-top:10px" outline @click="prompt = true">Add details</q-btn>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense color="black" v-model="details" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn outline color="deep-orange" label="Cancel" v-close-popup />
          <q-btn outline color="deep-orange" label="Submit" v-close-popup @click="$emit('answered')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Question } from 'Models/Question/Question'
import { Action } from 'vuex-class'

import Rating from './questions/Rating.vue'
import FreeText from './questions/FreeText.vue'
import PostCode from './questions/PostCode.vue'
import YesNo from './questions/YesNo.vue'
import MultipleChoice from './questions/MultipleChoice.vue'
import SingleChoice from './questions/SingleChoice.vue'
import Slider from './questions/Slider.vue'
import Age from './questions/Age.vue'

Vue.component('rating', Rating)
Vue.component('free-text', FreeText)
Vue.component('post-code', PostCode)
Vue.component('yes-no', YesNo)
Vue.component('multiple-choice', MultipleChoice)
Vue.component('single-choice', SingleChoice)
Vue.component('slider', Slider)
Vue.component('age', Age)

const namespace = 'profile'
@Component
export default class QuestionCard extends Vue {
  @Prop()
  question!: Question

  @Action('addAnswer', { namespace })
  addAnswer: any

  prompt = false

  details = ''

  askForExplanation = false

  handleAnswer (answer: string) {
    console.log("trigger")
    this.addAnswer({ [this.question.id]: { answer, details: this.details } })
    this.askForExplanation = this.$refs.question.answer.options?.askForExplanation
    if (!this.askForExplanation) {
      this.$emit('answered')
    }
  }

  public saveAnswer () {
    console.log('saving')
    this.addAnswer({ [this.question.id]: { answer: this.$refs.question.answer } })
  }

  mounted () {
    console.log(this.question)
  }
}
</script>
