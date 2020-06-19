<template>
  <q-input
    v-model="answer"
    input-type="textarea"
    autogrow
    dense
  ></q-input>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class FreeText extends Vue {
  @Prop({ default: '' })
  id: string

  handleAnswer () {
    this.$emit('answered', this.answer)
  }

  @Getter('answerById', { namespace })
  answerGetter: any;

  answer = '';

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer
  }
}
</script>
