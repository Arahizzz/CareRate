import { ActionTree } from 'vuex'
import axios from 'axios'
import { ProfileState, RootState } from 'Models/types'
import { Survey } from 'Models/Survey'
import { Question } from 'Models/Question/Question'

function getQuestionsFromSurvey (survey: Survey): Array<Question> {
  const questions: Array<Question> = []
  survey.groups.forEach(group => group.questions.forEach(question => questions.push(question)))
  return questions
}

export const actions: ActionTree<ProfileState, RootState> = {
  fetchData ({ commit }) {
    axios({
      url: 'https://dashboard.rate.nl/RateModules/Webservices/SurveyWebService.asmx/GetSurvey?surveyCode=tst001'
    }).then((response) => {
      const payload: Survey = response && response.data
      const questions: Array<Question> = getQuestionsFromSurvey(payload)
      commit('profileLoaded', questions)
    }, (error) => {
      console.log(error)
    })
  }
}
