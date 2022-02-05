/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import propTypes from 'prop-types'
import BannerArtist from '../../Component/Artists/BannerArtist'
import BasicSliderItems from '../../Component/Slider/BasicSliderItems'
import SongsSlider from '../../Component/Slider/SongsSlider'
import { db } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Artist.scss'

const Artist = ({ playerSong }) => {
  const params = useParams()
  const { id = '' } = params
  const [artist, setArtist] = useState(null)
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])

  Artist.propTypes = {
    playerSong: propTypes.func.isRequired,
  }

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

  // GETTING ALL SONGS
  useEffect(() => {
    const arraySong = [];
    (async () => {
      await Promise.all(
        albums.map(async (item) => {
          await db.collection('songs')
            .where('album', '==', item.id)
            .get()
            .then((res) => {
              res.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id
                arraySong.push(data)
              })
            })
        }),
      )
      setSongs(arraySong)
    })()
  }, [albums])

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
        <SongsSlider
          title="Canciones"
          data={songs}
          playerSong={playerSong}
        />
      </div>
    </div>
  )
}

export default Artist
