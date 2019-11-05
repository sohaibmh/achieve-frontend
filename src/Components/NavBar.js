import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = ({ routes, user }) => {
  return (
    <Menu>
      <Menu.Item as={NavLink} to={'/'} exact activeClassName="active">Home</Menu.Item>
      <Menu.Item as={NavLink} to={'/goals'} exact activeClassName="active">Goals</Menu.Item>
      {routes.map(route => (
        <Menu.Item key={route.path} as={NavLink} to={route.path} exact activeClassName="active">{route.title}</Menu.Item>
      ))}
       
      {/* {user && <Menu.Item>Hello {user.email}</Menu.Item>} */}
    </Menu>
  )
}
export default NavBar
