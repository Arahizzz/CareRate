<template>
  <div class="column" style="z-index:2; background: white;">
    <q-btn
      class="q-mt-sm"
      align="left"
      v-for="option in options"
      :key="option.value"
      color="option"
      @click="updateSelection(option.value)"
      outline
      no-caps
    >
      <q-icon left v-if="selection === option.value" name="radio_button_checked" color="deep-orange" />
      <q-icon left v-else name="radio_button_unchecked" color="option"/>
      <div class="fontsize-12 option">{{option.label}}</div>
    </q-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Model, Emit } from 'vue-property-decorator'
import { ButtonOption } from './ButtonOption'

@Component
export default class SingleChoiceButtonGroup extends Vue {
  @Prop({ default: () => [] })
  options!: ButtonOption[];

  @Model('input', { default: null })
  model!: number | null;

  selection!: number | null;

  @Emit('input')
  updateSelection (index: number) {
    this.selection = index
    return index
  }

  created () {
    this.selection = this.model
  }
}
</script>

<style lang="stylus" scoped>
.option {
  font-family: 'PP Woodland';
  font-weight: bold;
  color : $deep-orange;
}
</style>
