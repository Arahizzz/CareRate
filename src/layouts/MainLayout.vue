<template>
  <q-layout view="lHh Lpr lFf">
    <div class="column" style="height:100vh">
      <div class="col" >
      </div>
      <div class="col-8">
        <q-carousel
          v-model="slideIndex"
          ref="carousel"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          navigation
          padding
          height="100%"
          class="bg-transparent text-black"
        >
          <q-carousel-slide :name="startSlide" class="column no-wrap flex-center">
            <div class="q-mt-md">
              <start-card></start-card>
            </div>
          </q-carousel-slide>
          <q-carousel-slide v-for="(question,index) of questions" :name="index+1" :key="index" class="column no-wrap flex-center">
            <div class="q-mt-md text-center" style="min-width:50%">
              <question-card ref="currentQuestion" :question="question" @answered="$refs.carousel.next()"></question-card>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="questionsCount+1" class="column no-wrap flex-center">
            <div class="q-mt-md">
              <q-btn @click="handleEnd">End</q-btn>
            </div>
          </q-carousel-slide>

          <template v-slot:control>
              <q-carousel-control
              position="left"
                class="q-gutter-xs flex flex-center"
              >
                <q-btn
                  dense color="deep-orange" text-color="white" icon="arrow_left" size="xl"
                  @click="$refs.carousel.previous()"
                />
              </q-carousel-control>
              <q-carousel-control
                position="right"
                class="q-gutter-xs  flex flex-center"
              >
                <q-btn
                  dense color="deep-orange" text-color="white" icon="arrow_right" size="xl"
                  @click="$refs.carousel.next()"
                />
              </q-carousel-control>
              <q-carousel-control
                position="top"
              >
                <q-slider
                  v-model="slideIndex"
                  markers
                  :min="0"
                  :max="questionsCount+1"
                  color="deep-orange"
                />
              </q-carousel-control>
          </template>
        </q-carousel>
      </div>
      <div class="col">
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Getter } from 'vuex-class'
import { Component, Prop, Watch } from 'vue-property-decorator'
import QuestionCard from 'components/QuestionCard.vue'
import StartCard from 'components/StartCard.vue'
import { TranslatedQuestion } from '../../Models/Question/TranslatedQuestion'

Vue.component('question-card', QuestionCard)
Vue.component('start-card', StartCard)
const namespace = 'profile'
@Component
export default class MainLayout extends Vue {
  @Prop({ default: 'tst001' })
  surveyId!: string

  @Action('fetchData', { namespace })
  fetchData!: (surveyId: string) => void;

  @Getter('questions', { namespace })
  questions!: Array<TranslatedQuestion>;

  @Getter('questionsCount', { namespace })
  questionsCount!: number;

  @Getter('answers', { namespace })
  answers!: {};

  startSlide = 0;

  slideIndex = 0;

  @Watch('slideIndex')
  carouselNext () {
    try {
      this.$refs.currentQuestion[0].saveAnswer()
    } catch (error) {}
  }

  mounted () {
    console.log(this.surveyId)
    this.fetchData(this.surveyId)
  }

  handleEnd () {
    console.log(this.answers)
  }
}
</script>
