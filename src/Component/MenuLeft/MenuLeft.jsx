/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, MenuItem } from 'semantic-ui-react'
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom'
import './MenuLeft.scss'
import isUserAdmin from '../../firebase/Apis'
import BasicModal from '../Modal/BasicModal'

const MenuLeft = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const [activeMenu, setactiveMenu] = useState(location.pathname)
  const [userAdmin, setuserAdmin] = useState(false)

  MenuLeft.propTypes = {
    user: PropTypes.object.isRequired,
  }

  useEffect(() => {
    isUserAdmin(user.uid)
      .then((res) => {
        setuserAdmin(res)
      })
  }, [user])

  const handleMenu = (e, menu) => {
    setactiveMenu(menu.to)
  }

  return (
    <>
      <Menu vertical className="menu-left">
        <div className="top">
          <Menu.Item as={Link} to="/" name="home" active={activeMenu === '/'} onClick={handleMenu}>
            <Icon name="home" />
            {' '}
            Inicio
          </Menu.Item>
          <MenuItem as={Link} to="/artists" name="artists" active={activeMenu === '/artists'} onClick={handleMenu}>
            <Icon name="music" />
            {' '}
            Artistas
          </MenuItem>
        </div>
        {userAdmin
        && (
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
        )}
      </Menu>
      <BasicModal title="Test title" setShow={null}>
        <h2>Contanido del modal</h2>
      </BasicModal>
    </>
  )
}

export default MenuLeft
