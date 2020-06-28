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
      <q-icon left name="done" :color="selection[option.value]?'deep-orange':'option'" />
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
export default class MultiChoiceButtonGroup extends Vue {
  @Prop({ default: () => [] })
  options!: ButtonOption[];

  @Model('input', { default: () => [] })
  model!: number[];

  selection!: boolean[];

  @Emit('input')
  updateSelection (index: number) {
    Vue.set(this.selection, index, !this.selection[index])
    const selectedIndexes = []
    for (let i = 0; i < this.selection.length; i++) {
      if (this.selection[i]) {
        selectedIndexes.push(i)
      }
    }
    return selectedIndexes
  }

  created () {
    this.selection = new Array(this.options.length).fill(false)
    this.model.forEach((i) => { this.selection[i] = true })
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
