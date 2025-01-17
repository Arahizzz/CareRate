<template>
  <div>
    <!-- <p v-if="question.groupTitle !== null" class="fontsize-12 group-title">{{question.groupTitle}}</p> -->
    <p class="fontsize-18 question-title">
      {{question.title}}
      <span v-if="question.isRequired" style="color:red">*</span>
    </p>

    <rating
      v-if="question.questionType===0 || question.questionType===5 || question.questionType===6"
      ref="question"
      :id="question.id"
      @answered="handleAnswer"
    ></rating>
    <yes-no
      v-else-if="question.questionType===1"
      ref="question"
      :id="question.id"
      @answered="handleAnswer"
    ></yes-no>
    <single-choice
      v-else-if="question.questionType===2 || question.questionType===7 || question.questionType===10"
      ref="question"
      :id="question.id"
      :options="question.options"
      @answered="handleAnswer"
    ></single-choice>
    <free-text
      v-else-if="question.questionType===3 || question.questionType===8 || question.questionType===9"
      ref="question"
      :id="question.id"
      @answered="handleAnswer"
    ></free-text>
    <multiple-choice
      v-else-if="question.questionType===4"
      ref="question"
      :id="question.id"
      :options="question.options"
      @answered="handleAnswerWithoutTransition"
    ></multiple-choice>
    <slider
      v-else-if="question.questionType===7"
      ref="question"
      :id="question.id"
      @answered="handleAnswerWithoutTransition"
    ></slider>
    <post-code
      v-else-if="question.questionType===11"
      ref="question"
      :id="question.id"
      @answered="handleAnswer"
    ></post-code>
    <age
      v-else-if="question.questionType===12"
      ref="question"
      :id="question.id"
      @answered="handleAnswer"
    ></age>

    <q-btn
      class="button"
      v-if="askForExplanation"
      color="primary"
      style="margin-top:10px"
      outline
      @click="prompt = true"
    >Add details</q-btn>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6" style="font-family: PP Woodland; font-weight: bold;">Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            color="primary"
            v-model="details"
            autofocus
            @keyup.enter="prompt = false"
            :input-style="{
            'font-family': 'PP Woodland',
            'font-style': 'normal',
            'font-size': '20px',
            'font-weight': '250',
            'color': '#FF3908'
            }"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn class="button" outline color="primary" label="Cancel" v-close-popup />
          <q-btn class="button" outline color="primary" label="Submit" v-close-popup @click="$emit('answered')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import Rating from './questions/Rating.vue'
import FreeText from './questions/FreeText.vue'
import PostCode from './questions/PostCode.vue'
import YesNo from './questions/YesNo.vue'
import MultipleChoice from './questions/MultipleChoice.vue'
import SingleChoice from './questions/SingleChoice.vue'
import Slider from './questions/Slider.vue'
import Age from './questions/Age.vue'
import { TranslatedQuestion } from 'src/Models/Question/TranslatedQuestion'
import { AnswerInfo } from 'src/Models/AnswerInfo'

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
  question!: TranslatedQuestion

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => AnswerInfo | undefined;

  @Action('addAnswer', { namespace })
  addAnswer!: (response: {id: string; info: AnswerInfo}) => void;

  prompt = false

  details = ''

  askForExplanation = false

  handleAnswer (answer: { askForExplanation: boolean; answer: string | number | boolean }) {
    this.addAnswer({ id: this.question.id, info: new AnswerInfo(answer.answer, this.details, answer.askForExplanation) })
    this.askForExplanation = answer.askForExplanation
    if (!this.askForExplanation) {
      this.$emit('answered')
    }
  }

  handleAnswerWithoutTransition (answer: { askForExplanation: boolean; answer: number | number[] }) {
    this.askForExplanation = answer.askForExplanation
    this.addAnswer({ id: this.question.id, info: new AnswerInfo(answer.answer, this.details, answer.askForExplanation) })
  }

  public saveAnswer () {
    this.addAnswer({ id: this.question.id, info: new AnswerInfo((this.$refs.question as HTMLFormElement).answer, this.details, this.askForExplanation) })
  }

  mounted () {
    const answer = this.answerGetter(this.question.id)
    if (answer) {
      this.details = answer.details
      this.askForExplanation = answer.askForExplanation
    }
  }
}
</script>

<style lang="stylus">
.group-title {
  background: #EEEDFF;
  font-family: PP Woodland;
}

.question-title {
  font-family: PP Woodland;
  font-size: 150%;
  font-weight: bold;
  margin: 10px;
  z-index: 2;
  background: white;
}

.button {
  font-family: PP Woodland;
  font-weight: bold;
}
</style>
