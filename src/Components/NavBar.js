import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Dropdown, Menu } from 'semantic-ui-react'

let LogIn = () => {
  return (
    <Menu.Menu position='right'>
     <Menu.Item as={NavLink} to={'/login'} exact activeClassName="active"><Button color='vk'>Log in</Button></Menu.Item> 
     <Menu.Item as={NavLink} to={'/signup'} exact activeClassName="active"><Button color='vk'>Sign Up</Button></Menu.Item>
    </Menu.Menu>
  )
}

const NavBar = (props) => {
  return (
    <Menu sze='large' tabular onClick={() => console.log(props.x)}>
      <Menu.Item as={NavLink} to={'/'} exact activeClassName="active"><Button color='facebook'>Home</Button></Menu.Item>
      {props.user &&  <Menu.Item as={NavLink} to={'/goals'} exact activeClassName="active"><Button color='facebook'>Goals</Button></Menu.Item>}
      <Menu.Menu position='right'>
      {props.user === false ? LogIn(): null }
      {/* {props.user === false ?  : null} */}
      {props.user && <Menu.Item as={NavLink} to={'/logout'} exact activeClassName="active"><Button color='vk'>Log out</Button></Menu.Item>}

      {/* {routes.map(route => (
        <Menu.Item key={route.path} as={NavLink} to={route.path} exact activeClassName="active">{route.title}</Menu.Item>
      ))} */}
       
     {/* {user && <Menu.Item>Hello {user.email}</Menu.Item>} */}
     </Menu.Menu>
    </Menu>
  )
}
export default NavBar
