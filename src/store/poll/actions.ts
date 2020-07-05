import { ActionTree } from 'vuex'
import { ProfileState, RootState } from 'src/Models/types'
import { Question } from 'src/Models/Question/Question'
import { Survey } from 'src/Models/Survey'
import axios from 'axios'
import { Group } from 'src/Models/Group'
import { StartPage } from 'src/Models/TranslatedStartPage'
import { AnswerInfo } from 'src/Models/AnswerInfo'

function getQuestionsFromSurvey (survey: Survey): Question[] {
  survey.groups.forEach(g => g.questions.forEach(q => {
    q.groupTitle = g.title
  }))
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
    const languages = response.data.cultures
    console.log(response.data)
    const startInfo = new StartPage(response.data.title, response.data.description)
    commit('setLanguage', response.data.defaultCultureCode)
    commit('profileLoaded', { startInfo, questions: questions, languages })
  },

  addAnswer ({ commit }, answer: { id: string; info: AnswerInfo}) {
    commit('addAnswer', answer)
  },

  setLanguage ({ commit }, language: string) {
    commit('setLanguage', language)
  }
}
