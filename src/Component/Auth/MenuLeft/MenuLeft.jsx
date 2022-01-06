/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, MenuItem } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import './MenuLeft.scss'

const MenuLeft = ({ user }) => {
  MenuLeft.propTypes = {
    user: PropTypes.object.isRequired,
  }

  return (
    <Menu vertical className="menu-left">
      <div className="top">
        <MenuItem name="home">
          <Icon name="home" />
          {' '}
          Inicio
        </MenuItem>
        <MenuItem name="artists">
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
