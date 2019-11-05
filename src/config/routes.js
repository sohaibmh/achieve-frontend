import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import Goals from '../components/Goals'

export const routes = [
  // {
  //   title: 'Home',
  //   path: '/',
  //   component: Home
  // },
  // {
  //   title: 'All posts',
  //   path: '/posts',
  //   component: PostIndex
  // },
  // {
  //   title: 'Post show',
  //   path: '/posts/:id',
  //   component: PostShow,
  //   exact: true
  // },
  // {
  //   title: 'Goals',
  //   path: '/goals',
  //   component: Goals
  // },
  {
    title: 'Log in',
    path: '/login',
    component: LoginForm
  },
  {
    title: 'Sign up',
    path: '/signup',
    component: SignUpForm
  },
  {
    title: 'Log out',
    path: '/logout',
    component: props => {
      props.logout()

      return null
    }
  }
]
