import React from 'react'
import { Segment, Header, Icon, Form } from 'semantic-ui-react'
import API from '../adapters/API'


class Home extends React.Component {

  state = {goal: ''}

  postEventOnClick = event => {
    event.preventDefault()

    let objToAdd = {
      user_id: 1,
      name: event.target.value
    }

    // API.postCalendar(objToAdd)

    console.log(event.target.value)
  }

  render (){
  return (
    <Segment textAlign="center">
      <Header icon>
        <h2>Welcome</h2>
      </Header>
      <br/><br/><br/>
      <h3>Create a goal</h3>
      <Form onSubmit={this.postEventOnClick} onChange={event => this.setState({goal: event.target.value})}>
        <Form.Input name="goal" type="goal" placeholder="Goal" autocomplete="goal" />
        <Form.Button>Submit</Form.Button>
      </Form>
    </Segment>
  )
  }
}

export default Home


