<template>
  <div>
    <p class="text-h3">{{question.title}}</p>
    <free-text ref="question" :id="question.id" @answered="handleAnswer"></free-text>
    <q-btn color="deep-orange" outline @click="prompt = true">Add details</q-btn>
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
          <q-btn outline color="deep-orange" label="Submit" v-close-popup />
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

Vue.component('rating', Rating)
Vue.component('free-text', FreeText)
Vue.component('post-code', PostCode)
Vue.component('yes-no', YesNo)

const namespace = 'profile'
@Component
export default class QuestionCard extends Vue {
  @Prop()
  question!: Question

  @Action('addAnswer', { namespace })
  addAnswer: any

  prompt = false

  details = ''

  handleAnswer (answer: string) {
    this.addAnswer({ [this.question.id]: { answer, details: this.details } })
    this.$emit('answered')
  }

  public saveAnswer () {
    console.log('saving')
    this.addAnswer({ [this.question.id]: { answer: this.$refs.question.answer } })
  }
}
</script>
