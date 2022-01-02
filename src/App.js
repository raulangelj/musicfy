import React from 'react'
import { auth } from './firebase/firebaseConfig'

function App() {
  console.log('app')

  auth.onAuthStateChanged((currentUser) => {
    console.log(currentUser ? 'Estamos logeados' : ' No estamos logeados')
  })
  return (
    <div>
      <h1>App electron + React</h1>
    </div>
  )
}

export default App
