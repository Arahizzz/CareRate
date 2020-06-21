import { ActionTree } from 'vuex'
import { ProfileState, RootState } from 'Models/types'
import { Question } from 'Models/Question/Question'
import { Survey } from 'Models/Survey'
import axios from 'axios'
import { Group } from 'app/Models/Group'
import { TranslatedQuestion } from 'app/Models/Question/TranslatedQuestion'
import { TranslatedStartPage } from 'app/Models/TranslatedStartPage'

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
    console.log(response.data)
    const startInfo = TranslatedStartPage.translateStartPage(response.data, 'nl-NL')
    commit('profileLoaded', { startInfo, questions: questions.map((q) => TranslatedQuestion.translateQuestion(q, 'nl-NL')) })
  },

  addAnswer ({ commit }, answer: Record<string, string>) {
    commit('addAnswer', answer)
  },

  setLanguage ({ commit }, language: string) {
    commit('setLanguage', language)
  }
}
