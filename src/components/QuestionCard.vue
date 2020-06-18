<template>
  <div>
    {{question.title}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Question } from 'Models/Question/Question'
@Component
export default class QuestionCard extends Vue {
@Prop()
question: Question
}
</script>
