<template>
<div class="q-pa-md q-gutter-sm">
  <q-btn color="deep-orange" round outline label="Yes" size="xl" @click="()=>{addAnswer({[questionId]:'yes'})}"/>
  <q-btn color="deep-orange" round outline label="No"  size="xl" @click="()=>{addAnswer({[questionId]:'no'})}"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
const namespace = 'profile'
@Component
export default class YesNo extends Vue {
  @Prop({ default: '' })
  questionId!: string

  @Action('addAnswer', { namespace })
  addAnswer: any

  answer = ''
}
</script>
