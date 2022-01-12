/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BannerArtist from '../../Component/Artists/BannerArtist'
import BasicSliderItems from '../../Component/Slider/BasicSliderItems'
import { db } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Artist.scss'

const Artist = () => {
  const params = useParams()
  const { id = '' } = params
  const [artist, setArtist] = useState(null)
  const [albums, setAlbums] = useState([])

  // GETTING THE ARTIST DATA
  useEffect(() => {
    db.collection('artists')
      .doc(id)
      .get()
      .then((res) => {
        const data = res.data()
        data.id = res.id
        setArtist(data)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [id])

  // GETTING ALBUM DATA
  useEffect(() => {
    if (artist) {
      db.collection('albums')
        .where('artist', '==', artist.id)
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
    }
  }, [artist])

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <div className="artist__content">
        <BasicSliderItems
          title="Albumes"
          data={albums}
          folderImage="albums"
          urlName="album"
        />
      </div>
    </div>
  )
}

export default Artist
