import React from 'react'
import { Segment, Header, Icon, Form } from 'semantic-ui-react'
import API from '../adapters/API'


class Home extends React.Component {

  state = {goal: ''}

  postEventOnClick = event => {
    event.preventDefault()
    let objToAdd = {
      user_id: this.props.userID,
      name: this.state.goal
    }
    API.postGoal(objToAdd)
  }

  CreateGoal = () => {
    return (
      <div>
        <h3>Create a goal</h3>
        <Form onSubmit={this.postEventOnClick} onChange={event => this.setState({goal: event.target.value})}>
          <Form.Input name="goal" type="goal" placeholder="Goal" autocomplete="goal" />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }

  render (){
  return (
    <Segment textAlign="center">
      <Header icon>
        <h2>Welcome</h2>
      </Header>
      <br/><br/><br/>
      {this.props.user === false ? "Login or Sign up" : this.CreateGoal()}
      <br/><br/><br/>   
    </Segment>
  )
  }
}

export default Home


