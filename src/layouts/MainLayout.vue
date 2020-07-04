<template>
  <q-layout view="lHh Lpr lFf">
    <div class="column" style="height:100vh">
      <div class="col">
        <q-carousel
          v-model="slideIndex"
          ref="carousel"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          padding
          height="100%"
          class="bg-transparent text-black"
        >
          <q-carousel-slide :name="startSlide" class="row no-wrap flex-center">
            <div class="col" />
            <div class="col-xs-8 col-md-10 q-mt-md">
              <start-card :info="startInfo" :start="carouselNext"></start-card>
            </div>
            <div class="col" />
          </q-carousel-slide>
          <q-carousel-slide
            v-for="(question,index) of questions"
            :name="index+1"
            :key="index"
            class="column flex-center"
          >
            <div class="q-mt-md text-center" style="min-width:50%; max-width:75%; max-height: 100%; z-index: 2; background: white;">
              <question-card
                ref="currentQuestion"
                :question="question"
                @answered="$refs.carousel.next()"
              ></question-card>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="questionsCount+1" class="column no-wrap flex-center">
            <div class="q-mt-md">
              <q-btn @click="handleEnd">End</q-btn>
            </div>
          </q-carousel-slide>

          <template v-if="slideIndex>0 && windowWidth >= 800" v-slot:control>
            <q-carousel-control position="left" class="q-gutter-xs flex flex-center">
              <q-btn
                dense
                color="deep-orange"
                text-color="white"
                size="lg"
                @click="carouselPrevios"
                style="height:100px; border-radius:0"
              >
                <q-img src="~assets/arrow_left.png" style="width:100px"></q-img>
              </q-btn>
            </q-carousel-control>
            <q-carousel-control position="right" class="q-gutter-xs flex flex-center">
              <q-btn
                dense
                color="deep-orange"
                text-color="white"
                size="lg"
                style="height:100px; border-radius:0"
                @click="carouselNext"
              >
                <q-img src="~assets/arrow_left.png" style="width:100px; transform:scaleX(-1);"></q-img>
              </q-btn>
            </q-carousel-control>
            <q-carousel-control position="top">
              <q-slider
                v-model="slideIndex"
                ref="slider"
                markers
                :min="0"
                :max="questionsCount+1"
                color="deep-orange"
                @input="carouselToSlide"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
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
import { TranslatedQuestion } from 'src/Models/Question/TranslatedQuestion'
import { TranslatedStartPage } from 'src/Models/TranslatedStartPage'
import { AnswerInfo } from 'src/Models/AnswerInfo'

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

  @Getter('answerById', { namespace })
  answerGetter!: (id: string) => AnswerInfo | undefined;;

  @Getter('startInfo', { namespace })
  startInfo!: TranslatedStartPage;

  startSlide = 0;

  slideIndex = 0;

  @Watch('slideIndex')
  slideIndexWatcher () {
    try {
      (this.$refs.currentQuestion as HTMLFormElement[])[0].saveAnswer()
    } catch (error) { }
  }

  carouselToSlide (newSlideIndex: number) {
    const [min, max] = [0, newSlideIndex - 1]
    console.log({ min, max })
    for (let i = min; i < max; i++) {
      if (this.questions[i].isRequired && this.answerGetter(this.questions[i].id) == null) {
        this.slideIndex = i + 1
        break
      }
    }
    console.log(this.slideIndex);
    (this.$refs.slider as HTMLFormElement).model = this.slideIndex
  }

  carouselPrevios () {
    if (this.slideIndex > 0) {
      const question = this.questions[this.slideIndex - 1]
      if (!question.isRequired || this.answerGetter(question.id) != null) {
        (this.$refs.carousel as HTMLFormElement).previous()
      } else {
        alert('question is mandatory')
      }
    }
  }

  carouselNext () {
    if (this.slideIndex > 0) {
      const question = this.questions[this.slideIndex - 1]
      if (!question.isRequired || this.answerGetter(question.id) != null) {
        (this.$refs.carousel as HTMLFormElement).next()
      } else {
        console.log(this.answerGetter(question.id))
        alert('question is mandatory')
      }
    } else {
      (this.$refs.carousel as HTMLFormElement).next()
    }
  }

  windowWidth = window.innerWidth;

  mounted () {
    this.fetchData(this.surveyId)
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  }

  handleEnd () {
    console.log(this.answers)
  }
}
</script>

<style>
@font-face {
  font-family: PP Woodland;
  src: url(../assets/fonts/PPWoodland-Ultralight.otf);
  font-weight: normal;
}

@font-face {
  font-family: PP Woodland;
  src: url(../assets/fonts/PPWoodland-Bold.otf);
  font-weight: bold;
}

@font-face {
  font-family: Monument Extended;
  src: url(../assets/fonts/MonumentExtended-Regular.otf);
}

.title {
  font-family: PP Woodland;
  font-weight: bold;
  line-height: 150%;
}
</style>
