/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Albums.scss'

const Albums = () => {
  const [albums, setAlbums] = useState([])
  console.log('albums: ', albums)

  useEffect(() => {
    db.collection('albums')
      .get()
      .then((res) => {
        const arrayAlbums = []
        res.docs?.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          arrayAlbums.push(data)
        })
        setAlbums(arrayAlbums)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  return (
    <div className="albums">
      <h1>Albumes</h1>
    </div>
  )
}

export default Albums
