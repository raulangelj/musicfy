/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BannerArtist from '../../Component/Artists/BannerArtist'
import { db } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Artist.scss'

const Artist = () => {
  const params = useParams()
  const { id = '' } = params
  const [artist, setArtist] = useState(null)

  useEffect(() => {
    db.collection('artists')
      .doc(id)
      .get()
      .then((res) => {
        setArtist(res.data())
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [id])

  return (
    <div>
      {
        artist && <BannerArtist artist={artist} />
      }
    </div>
  )
}

export default Artist
