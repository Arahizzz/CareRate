<template>
<div class="q-pa-md q-gutter-sm">
  <q-btn v-for="i in 10" :key="i" color="deep-orange" round outline :label="i"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
@Component
export default class Rating extends Vue {
  @Prop({ default: '' })
  questionId:string
}
</script>
