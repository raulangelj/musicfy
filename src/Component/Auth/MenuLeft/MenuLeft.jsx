/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, MenuItem } from 'semantic-ui-react'
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom'
import './MenuLeft.scss'

const MenuLeft = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  MenuLeft.propTypes = {
    user: PropTypes.object.isRequired,
  }

  return (
    <Menu vertical className="menu-left">
      <div className="top">
        <Menu.Item as={Link} to="/" name="home">
          <Icon name="home" />
          {' '}
          Inicio
        </Menu.Item>
        <MenuItem as={Link} to="/artists" name="artists">
          <Icon name="music" />
          {' '}
          Artistas
        </MenuItem>
      </div>
      <div className="footer">
        <MenuItem>
          <Icon name="plus square outline" />
          {' '}
          Nuevo Artista
        </MenuItem>
        <MenuItem>
          <Icon name="plus square outline" />
          {' '}
          Nueva Cancion
        </MenuItem>
      </div>
    </Menu>
  )
}

export default MenuLeft
