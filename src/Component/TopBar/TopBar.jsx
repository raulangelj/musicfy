/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Link, useLocation, useParams, useNavigate,
} from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/firebaseConfig'
import UserImage from '../../assets/png/user.png'
import './TopBar.scss'

const TopBar = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  TopBar.propTypes = {
    user: PropTypes.object.isRequired,
  }

  const goBack = () => {
    navigate(-1)
  }

  const logout = () => {
    toast.success('Has cerrado sesion con exito!')
    auth.signOut()
  }

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={user.photoURL || UserImage} />
          {
            user.displayName
          }
        </Link>
        <Icon name="power off" onClick={logout} />
      </div>
    </div>
  )
}

export default TopBar
