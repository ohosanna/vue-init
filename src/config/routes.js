import App from '../app'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/welcome/:username',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
    ]
  }
]
