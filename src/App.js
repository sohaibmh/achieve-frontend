import React from 'react'
import './App.css'
import { routes } from './config/routes'
import NavBar from './components/NavBar'
import { Route } from 'react-router-dom'
import { Container, Message } from 'semantic-ui-react'
import API from './adapters/API'
import Goals from './components/Goals';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';



const notFoundMessage = () => <Message negative>NOT FOUND</Message>

const style = {
  position: 'relative',
  margin: '50 px auto'
}

class App extends React.Component {
  state = {
    user: false,
    userID: '',
    goals: [],

  }

  componentDidMount() {
    API.validateUser().then(user => {
      if (user.errors) {
        alert(user.errors)
        this.props.history.push('/login')
      } else {
        this.setState({ 
          user: user,
          userID: user.id
         })
      }
  
    })
    this.getGoals()
  }



  // shouldComponentUpdate() {
  //   this.getGoals()
  // }


  getGoals = () => {
    return fetch(`http://localhost:3000/api/v1/goals`, {method: "GET"})
    .then(response => response.json())
    .then(data => this.setState({goals: data.filter(goal => goal.user.id === this.state.userID).map(data => {return {name: data.name, ID: data.id, calendar: data.calendars.map(calendar => calendar.date), calendarWithID: data.calendars.map(calendar => calendar.id + ":" + calendar.date)  } } )})
    )   
  }

  // getGoalsWithID = () => {
  //   return fetch(`http://localhost:3000/api/v1/goals`, {method: "GET"})
  //   .then(response => response.json())
  //   .then(data => this.setState({goals: data.filter(goal => goal.user.id === this.state.userID).map(data => {return {name: data.name, ID: data.id, calendar: data.calendars.map(calendar => calendar.date)} } )})
  //   )   
  // }



     // getDatesWithID = () => {
    //   return fetch(`http://localhost:3000/api/v1/calendars`, {method: "GET"})
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //       datesWithID: data.map(data => data.id + ":" + data.date)
    //     })
    //   )   
    // }
  
  login = user => {
    this.setState({ 
      user: user,
      userID: user.id 
    }, () => this.props.history.push('/'))
  }

  signup = user => {
    this.setState({ 
      user: user,
      userID: user.id }, () => this.props.history.push('/'))
  }

  logout = () => {
    API.logout()
    this.setState({ user: false })
    this.props.history.push('/login')
  }

  onDayClick = (e, day) => {
  alert(day)
  }


  render() {
    return (
      <div className="App">
          <NavBar routes={routes} user={this.state.user}/>
        <Container>
          <Route exact path="/" render={() => <Home user={this.state.user} userID={this.state.userID}/>} /> 
          <Route exact path="/login" render={() => <LoginForm  login={this.login}/>} /> 
          <Route exact path="/signup" render={() => <SignUpForm  signup={this.signup}/>} /> 
          <Route exact path="/logout" render={() => {this.logout()}} /> 
          {this.state.goals.map(goal => <Route path="/goals" render={()=><Goals goalID={goal.ID} goalName={goal.name} goalCalendar={goal.calendar} goalDatesWithID={goal.calendarWithID} width='302px' onDayClick={(e, day) => this.onDayClick(e, day)} userID={this.state.userID} />}/>  )}
        </Container>
      </div>
    )
  }
}

export default App
