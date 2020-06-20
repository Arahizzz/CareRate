import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/:surveyId',
    component: () => import('layouts/MainLayout.vue'),
    props: true
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
