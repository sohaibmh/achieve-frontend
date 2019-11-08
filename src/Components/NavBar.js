import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = (props) => {
  return (
    <Menu onClick={() => console.log(props.x)}>
      <Menu.Item as={NavLink} to={'/'} exact activeClassName="active">Home</Menu.Item>
      {props.user &&  <Menu.Item as={NavLink} to={'/goals'} exact activeClassName="active">Goals</Menu.Item>}
      {props.user === false ? <Menu.Item as={NavLink} to={'/login'} exact activeClassName="active">Log in</Menu.Item> : null }
      {props.user === false ? <Menu.Item as={NavLink} to={'/signup'} exact activeClassName="active">Sign up</Menu.Item> : null}
      {props.user && <Menu.Item as={NavLink} to={'/logout'} exact activeClassName="active">Log out</Menu.Item>}

      {/* {routes.map(route => (
        <Menu.Item key={route.path} as={NavLink} to={route.path} exact activeClassName="active">{route.title}</Menu.Item>
      ))} */}
       
      {/* {user && <Menu.Item>Hello {user.email}</Menu.Item>} */}
    </Menu>
  )
}
export default NavBar
