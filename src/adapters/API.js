const API_ENDPOINT = 'http://localhost:3000/api/v1'
const POSTS_URL = `${API_ENDPOINT}/calendars`
const GOALS_URL = `${API_ENDPOINT}/goals`
const LOGIN_URL = `${API_ENDPOINT}/login`
const SIGNUP_URL = `${API_ENDPOINT}/users`
const VALIDATE_URL = `${API_ENDPOINT}/validate`

const jsonHeaders = (more = {}) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...more
})
const authHeader = (more = {}) => ({
  Authorisation: localStorage.getItem('token'),
  ...more
})

const handleError = () => {
  console.error('something went wrong')
}

const handleServerResponse = res => {
  if (res.ok) {
    return res.text().then(text => {
      try {
        return JSON.parse(text)
      } catch (error) {
        return { staticPageContent: text }
      }
    })
  } else if (res.status === 503) {
    return { code: 503 }
  } else if (res.status === 500) {
    return { code: 500, error: 'Something went wrong' }
  } else {
    return res.text().then(text => {
      try {
        return JSON.parse(text)
      } catch (error) {
        return res
      }
    })
  }
}

const getPosts = () => fetch(POSTS_URL).then(handleServerResponse)
// const getPost = id => fetch(`${POSTS_URL}/${id}`).then(handleServerResponse)

const login = userDetails =>
  fetch(LOGIN_URL, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ user: userDetails })
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.token) {
        localStorage.setItem('token', userDetails.token)
      }
      return userDetails.user
    })
    .catch(handleError)



                      const signup = userDetails =>
                        fetch(SIGNUP_URL, {
                          method: 'POST',
                          headers: jsonHeaders(),
                          body: JSON.stringify({ user: userDetails })
                        })
                          .then(response => response.json())


                    // postCalendar = (objToAdd) => {   
                  
                    //   let data = {
                    //     date: objToAdd
                    //   }
                    
                    //   fetch('http://localhost:3000/calendars', {
                    //   method: "POST",
                    //   headers: {"Content-Type": "application/json", Accept: "application/json"},
                    //   body: JSON.stringify(data)
                    //   }).then(response => response.json())
                        
                    // }   

const validateUser = () =>
  fetch(VALIDATE_URL, {
    method: 'POST',
    headers: authHeader()
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (!userDetails) {
        return { errors: ['something went wrong '] }
      }
      if (userDetails.token) {
        localStorage.setItem('token', userDetails.token)
      }
      return userDetails.user || userDetails
    })
    .catch(handleError)

  const postGoal = goal =>
  fetch(GOALS_URL, {
    method: 'POST',
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify(goal)
  })
    .then(handleServerResponse)
    .catch(handleError)

const updateGoal = (id, goal) =>
fetch(`${GOALS_URL}/${id}`, {
  method: 'PATCH',
  headers: jsonHeaders(authHeader()),
  body: JSON.stringify(goal)
})
  .then(handleServerResponse)
  .catch(handleError)

const deleteGoal = id =>
fetch(`${GOALS_URL}/${id}`, {
method: 'DELETE',
})
.then(handleServerResponse)
.catch(handleError)

const postCalendar = date =>
  fetch(POSTS_URL, {
    method: 'POST',
    headers: jsonHeaders(authHeader()),
    body: JSON.stringify(date)
  })
    .then(handleServerResponse)
    .catch(handleError)

const updateCalendar = (id, date) =>
fetch(`${POSTS_URL}/${id}`, {
  method: 'PATCH',
  headers: jsonHeaders(authHeader()),
  body: JSON.stringify(date)
})
  .then(handleServerResponse)
  .catch(handleError)

const logout = () => {
  localStorage.removeItem('token')
}
export default {
  getPosts,
  login,
  validateUser,
  postCalendar,
  updateCalendar,
  postGoal,
  deleteGoal,
  updateGoal,
  logout,
  signup
}
