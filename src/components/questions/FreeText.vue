<template>
<div>
  <q-input
    v-model="answer"
    input-type="textarea"
    autogrow
    dense
  ></q-input>
  <q-btn style="margin-top:10px" outline color="deep-orange" @click="handleAnswer">Submit</q-btn>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class FreeText extends Vue {
  @Prop({ default: '' })
  id!: string

  handleAnswer () {
    if (this.answer.length > 0) {
      this.$emit('answered', this.answer)
    } else {
      alert("Field is empty")
    }
  }

  @Getter('answerById', { namespace })
  answerGetter: any;

  answer = '';

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer
  }
}
</script>
