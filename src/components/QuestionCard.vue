<template>
  <div>
    <yes-no :questionId="question.id"></yes-no>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Question } from 'Models/Question/Question'

import Rating from './questions/Rating.vue'
import FreeText from './questions/FreeText.vue'
import PostCode from './questions/PostCode.vue'
import YesNo from './questions/YesNo.vue'

Vue.component('rating', Rating)
Vue.component('free-text', FreeText)
Vue.component('post-code', PostCode)
Vue.component('yes-no', YesNo)

@Component
export default class QuestionCard extends Vue {
@Prop()
question!: Question
}
</script>
