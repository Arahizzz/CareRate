import { ActionTree } from 'vuex'
import { ProfileState, RootState } from 'Models/types'
import { Question } from 'Models/Question/Question'
import { Survey } from 'Models/Survey'
import axios from 'axios'
import { Group } from 'app/Models/Group'

function getQuestionsFromSurvey (survey: Survey): Question[] {
  return survey.groups.flatMap((g: Group) => g.questions)
}

export const actions: ActionTree<ProfileState, RootState> = {
  async fetchData ({ commit }, surveyId: string) {
    const response = await axios.get<Survey>('https://dashboard.rate.nl/RateModules/Webservices/SurveyWebService.asmx/GetSurvey', {
      params: {
        surveyCode: surveyId
      }
    })
    const questions = getQuestionsFromSurvey(response.data)
    commit('profileLoaded', questions)
    // fetch('https://dashboard.rate.nl/RateModules/Webservices/SurveyWebService.asmx/GetSurvey?surveyCode=' + surveyId).then(
    //   (response) => {
    //     if (response.ok) {
    //       response.json<Survey>().then(survey => {
    //         console.log(survey)
    //         const questions: Question[] = getQuestionsFromSurvey(survey)
    //         commit('profileLoaded', questions)
    //       })
    //     } else {
    //       alert('Error HTTP: ' + response.status)
    //     }
    //   }
    // )
  },

  addAnswer ({ commit }, answer: Record<string, string>) {
    commit('addAnswer', answer)
  },

  setLanguage ({ commit }, language: string) {
    commit('setLanguage', language)
  }
}