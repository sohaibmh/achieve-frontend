import Home from '../components/Home'
import PostIndex from '../components/PostIndex'
import PostShow from '../components/PostShow'
import LoginForm from '../components/LoginForm'
                import SignUpForm from '../components/SignUpForm'
import NewPostForm from '../components/NewPostForm'

export const routes = [
  {
    title: 'Home',
    path: '/',
    component: Home
  },
  {
    title: 'All posts',
    path: '/posts',
    component: PostIndex
  },
  // {
  //   title: 'Post show',
  //   path: '/posts/:id',
  //   component: PostShow,
  //   exact: true
  // },
  {
    title: 'New post',
    path: '/postsnew',
    component: NewPostForm
  },
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
