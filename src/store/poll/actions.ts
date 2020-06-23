import { ActionTree } from 'vuex'
import { ProfileState, RootState } from 'Models/types'
import { Question } from 'Models/Question/Question'
import { Survey } from 'Models/Survey'
import axios from 'axios'
import { Group } from 'app/Models/Group'
import { StartPage } from 'app/Models/TranslatedStartPage'

function getQuestionsFromSurvey (survey: Survey): Question[] {
  survey.groups.forEach(g=>g.questions.forEach(q => {
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
    commit('profileLoaded', { startInfo, questions: questions, languages })
    commit('setLanguage', 'nl-NL')
  },

  addAnswer ({ commit }, answer: Record<string, string>) {
    commit('addAnswer', answer)
  },

  setLanguage ({ commit }, language: string) {
    commit('setLanguage', language)
  }
}
