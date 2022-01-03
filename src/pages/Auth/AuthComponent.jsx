/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import AuthOptions from '../../Component/Auth/AuthOptions'
import LoginForm from '../../Component/Auth/LoginForm'
import RegisterForm from '../../Component/Auth/RegisterForm'
import BackgroundAuth from '../../assets/jpg/background-auth.jpg'
import LogoNameWhite from '../../assets/png/logo-name-white.png'
import './Auth.scss'

const AuthComponent = () => {
  const [selectedForm, setselectedForm] = useState(null)

  const handlerForm = () => {
    switch (selectedForm) {
      case 'login':
        return <LoginForm />
      case 'register':
        return (
          <RegisterForm
            setselectedForm={setselectedForm}
          />
        )
      default:
        return (
          <AuthOptions
            setselectedForm={setselectedForm}
          />
        )
    }
  }

  return (
    <div
      className="auth"
      style={{
        backgroundImage: `url(${BackgroundAuth})`,
      }}
    >
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoNameWhite} alt="Musicfy" />
        </div>
        {
          handlerForm()
        }
      </div>
    </div>
  )
}

export default AuthComponent
