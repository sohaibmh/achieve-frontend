import React from 'react'
import './App.css'
import { routes } from './config/routes'
import NavBar from './components/NavBar'
import { Route } from 'react-router-dom'
import { Container, Message } from 'semantic-ui-react'
import API from './adapters/API'
import Calendar from './components/Calendar'
import Goals from './components/Goals';
import Home from './components/Home';

const notFoundMessage = () => <Message negative>NOT FOUND</Message>

const style = {
  position: 'relative',
  margin: '50 px auto'
}

class App extends React.Component {
  state = {
    user: null,
    userID: 'x',
  }

  componentDidMount() {
    API.validateUser().then(user => {
      // if (user.errors) {
      //   alert(user.errors)
      //   this.props.history.push('/login')
      // } else {
        this.setState({ 
          user: user,
          userID: user.id
         })
    //   }
    })
  }

  login = user => {
    this.setState({ 
      user: user,
      userID: user.id }, () => this.props.history.push('/'))
  }

  signup = user => {
    this.setState({ 
      user: user,
      userID: user.id }, () => this.props.history.push('/'))
  }

  logout = () => {
    API.logout()
    this.setState({ user: null })
    this.props.history.push('/login')
  }

  onDayClick = (e, day) => {
  alert(day)
  }

  render() {
    return (
      <div className="App">
        <NavBar routes={routes} user={this.state.user} />
        <Container>
        
          {routes.map(route => (
            <Route
              key={route.path}
              exact
              path={route.path}
              component={routerProps =>
                route.component ? (
                  <route.component
                    {...routerProps}
                    signup={this.signup}
                    login={this.login}
                    logout={this.logout}
                    // userID={this.state.userID}
                    // onDayClick={(e, day) => this.onDayClick(e, day)}
                    // width='302px'
                    // style={style}
                  />
                ) : (
                  notFoundMessage()
                )
              }
            />
            
          ))}
          <br/><br/>
          {this.state.user ? <Route path="/goals" render={()=><Goals width='302px' onDayClick={(e, day) => this.onDayClick(e, day)} userID={this.state.userID} />}/> : undefined}
          {/* {this.state.user ? <Route path="/goals" render={()=><Goals width='302px' onDayClick={(e, day) => this.onDayClick(e, day)} userID={this.state.userID} />}/> : undefined} */}
          <Route exact path="/" render={() => <Home/>} /> 
        </Container>
      </div>
    )
  }
}

export default App


// import React, { Component } from 'react';
// import './App.css';
// import Calendar from './components/Calendar'

// const style = {
//   position: 'relative',
//   margin: '50 px auto'
// }


// class App extends Component {
  
//   onDayClick = (e, day) => {
//     alert(day)
//   }

//   render() {
//     return (
//       <div>
//         <Calendar style={style} width='302px' onDayClick={(e, day) => this.onDayClick(e, day)}  />
//       </div>
//     );
//   }
// }

// export default App;