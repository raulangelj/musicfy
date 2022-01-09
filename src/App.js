/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { auth } from './firebase/firebaseConfig'
import LoggedLayout from './layouts/LoggedLayout'
import AuthComponent from './pages/Auth/AuthComponent'

function App() {
  const [user, setUser] = useState(null)
  const [isloading, setisloading] = useState(true)
  const [reloadApp, setreloadApp] = useState(false)

  auth.onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      auth.signOut()
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setisloading(false)
  })

  if (isloading) {
    return null
  }

  return (
    <>
      {
        !user
          ? <AuthComponent />
          : (
            <LoggedLayout
              user={user}
              setreloadApp={setreloadApp}
            />
          )
      }
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  )
}

export default App
