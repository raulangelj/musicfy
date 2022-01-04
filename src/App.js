/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { auth } from './firebase/firebaseConfig'
import AuthComponent from './pages/Auth/AuthComponent'

function App() {
  const [user, setUser] = useState(null)
  const [isloading, setisloading] = useState(true)

  auth.onAuthStateChanged((currentUser) => {
    console.log(currentUser)
    if (!currentUser) {
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setisloading(false)
  })

  if (isloading) {
    return null
  }

  // return (
  //   !user ? (
  //     <AuthComponent />
  //   ) : <h1>Usuario Loggeado</h1>
  // )
  return (
    <>
      {
        !user
          ? <AuthComponent />
          : <h1>Usuario Loggeado</h1>
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
