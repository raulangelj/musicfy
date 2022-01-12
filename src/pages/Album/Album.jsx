/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Album.scss'

const Album = () => {
  const params = useParams()
  const { id } = params
  const [album, setAlbum] = useState(null)
  const [albumImage, setAlbumImage] = useState(null)
  const [artist, setArtist] = useState(null)

  // USEEFECT TO GET ALBUM IMAGE IN FIRESTORE
  useEffect(() => {
    db.collection('albums')
      .doc(id)
      .get()
      .then((res) => {
        setAlbum(res.data())
      })
      .catch((err) => {
        alertErrors(err)
      })
  }, [id])

  // USEEFECT TO GET ALBUM IMAGE IN STOREGE
  useEffect(() => {
    if (album) {
      storage.ref(`albums/${album?.banner}`)
        .getDownloadURL()
        .then((res) => {
          setAlbumImage(res)
        })
        .catch((err) => {
          alertErrors(err.code)
        })
    }
  }, [album])

  // USEEFECT TO GET ARTIST INFO IN FIRESTORE
  useEffect(() => {
    if (album) {
      db.collection('artists')
        .doc(album?.artist)
        .get()
        .then((res) => {
          setArtist(res.data())
        })
        .catch((err) => {
          alertErrors(err.code)
        })
    }
  }, [album])

  return (
    <div>
      <h2>Single page album</h2>
    </div>
  )
}

export default Album
