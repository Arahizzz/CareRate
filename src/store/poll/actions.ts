import { ActionTree } from 'vuex'
import { ProfileState, RootState } from 'Models/types'
import { Question } from 'Models/Question/Question'
import { Survey } from 'Models/Survey'
import { state } from './profile'

function getQuestionsFromSurvey (survey: Survey): Question[] {
  const res: Question[] = []
  survey.groups.forEach(group => {
    group.questions.forEach(question => {
      res.push(question)
    })
  })
  return res
}

export const actions: ActionTree<ProfileState, RootState> = {
  fetchData ({ commit}, surveyId: number) {
    fetch('https://dashboard.rate.nl/RateModules/Webservices/SurveyWebService.asmx/GetSurvey?surveyCode=' + surveyId).then(
      (response) => {
        if (response.ok) {
          response.json<Survey>().then(survey => {
            console.log(survey)
            const questions: Question[] = getQuestionsFromSurvey(survey)
            commit('profileLoaded', questions)
          })
        } else {
          alert('Error HTTP: ' + response.status)
        }
      }
    )
  },

  addAnswer ({ commit }, answer: Record<string, string>) {
    commit('addAnswer', answer)
  },

  setLanguage ({ commit }, language: string) {
    commit('setLanguage', language)
  }
}
