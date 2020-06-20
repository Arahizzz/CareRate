<template>
<div class="q-pa-md q-gutter-sm">
  <q-btn v-for="i in 10" :key="i" :color="answer==i+''?'primary':'deep-orange'" @click="()=>{answer=i+''}" round outline :label="i"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const namespace = 'profile'
@Component
export default class Rating extends Vue {
  @Prop({ default: '' })
  id!: string

  @Getter('answerById', { namespace })
  answerGetter: any;

  answer = '';

  mounted () {
    this.answer = this.answerGetter(this.id)?.answer
  }
}
</script>
