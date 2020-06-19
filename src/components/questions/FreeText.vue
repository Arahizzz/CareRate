<template>
  <q-input
    v-model="answer"
    input-type="textarea"
    autogrow
    dense
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
@Component
export default class FreeText extends Vue {
  @Prop({ default: '' })
  questionId!: string

  answer = '';
}
</script>
