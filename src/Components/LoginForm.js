import React from 'react'
import { Form } from 'semantic-ui-react'
import API from '../adapters/API'
import './loginForm.css'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  submit = e => {
    e.preventDefault()
    API.login({ email: this.state.email, password: this.state.password }).then(data => {
      if (data.error) {
        throw Error(data.error)
      } else {
        this.props.login(data)
        this.props.getGoals()
      }
    })
    .catch(error => {
      alert('not recognised')
    })
  }

  render() {
    return (

      <Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
        className='Login'
      >
        <Form.Input required
          name="email"
          type="email"
          placeholder="email"
          autocomplete="email"
          value={this.state.email}
        />
        <Form.Input required
          name="password"
          type="password"
          placeholder="password"
          autocomplete="password"
          value={this.state.password}
        />
        <Form.Button basic color='blue'>Submit</Form.Button>
      </Form>
    )
  }
}

export default LoginForm
