/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, MenuItem } from 'semantic-ui-react'
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom'
import './MenuLeft.scss'
import { isUserAdmin } from '../../firebase/Apis'
import BasicModal from '../Modal/BasicModal'
import AddArtistForm from '../Artists/ArtistsForm'

const MenuLeft = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const [activeMenu, setactiveMenu] = useState(location.pathname)
  const [userAdmin, setuserAdmin] = useState(false)
  const [modal, setmodal] = useState({
    show: false,
    title: '',
    content: '',
  })

  MenuLeft.propTypes = {
    user: PropTypes.object.isRequired,
  }

  useEffect(() => {
    isUserAdmin(user.uid)
      .then((res) => {
        setuserAdmin(res)
      })
  }, [user])

  useEffect(() => {
    setactiveMenu(location.pathname)
  }, [location])

  // ! Remove function form Menu.item onclick because useEffect does the same thing
  // const handleMenu = (e, menu) => {
  //   setactiveMenu(menu.to)
  // }

  const handleModal = (type) => {
    switch (type) {
      case 'artist':
        setmodal({
          title: 'Nuevo artista',
          content: <AddArtistForm setModal={setmodal} />,
          show: true,
        })
        break
      case 'song':
        setmodal({
          title: 'Nueva cancion',
          content: <h2>Formulario nueva cancion</h2>,
          show: true,
        })
        break
      default:
        setmodal({
          title: null,
          content: null,
          show: false,
        })
        break
    }
  }

  return (
    <>
      <Menu vertical className="menu-left">
        <div className="top">
          <Menu.Item as={Link} to="/" name="home" active={activeMenu === '/'}>
            <Icon name="home" />
            {' '}
            Inicio
          </Menu.Item>
          <MenuItem as={Link} to="/artists" name="artists" active={activeMenu === '/artists'}>
            <Icon name="music" />
            {' '}
            Artistas
          </MenuItem>
        </div>
        {userAdmin
        && (
          <div className="footer">
            <MenuItem onClick={() => handleModal('artist')}>
              <Icon name="plus square outline" />
              {' '}
              Nuevo Artista
            </MenuItem>
            <MenuItem onClick={() => handleModal('song')}>
              <Icon name="plus square outline" />
              {' '}
              Nueva Cancion
            </MenuItem>
          </div>
        )}
      </Menu>
      <BasicModal show={modal.show} title={modal.title} setmodal={setmodal}>
        {
          modal.content
        }
      </BasicModal>
    </>
  )
}

export default MenuLeft
