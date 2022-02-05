/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import BannerHome from '../../Component/BannerHome'
import BasicSliderItems from '../../Component/Slider/BasicSliderItems'
import SongsSlider from '../../Component/Slider/SongsSlider'
import { db } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Home.scss'

const Home = ({ playerSong }) => {
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])

  Home.propTypes = {
    playerSong: propTypes.func.isRequired,
  }

  // USEEFECT TO GET ARTIST DATA IN FIREBASE
  useEffect(() => {
    db.collection('artists')
      .get()
      .then((res) => {
        const arrayArtists = []
        res.docs.forEach((artist) => {
          const data = artist.data()
          data.id = artist.id
          arrayArtists.push(data)
        })
        setArtists(arrayArtists)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  // USEEFECT TO GET ALBUM DATA FROM FIREBASE
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

  // USEEFECTO TO GET SONGS DATA FROM FIREBASE
  useEffect(() => {
    db.collection('songs')
      .limit(10)
      .get()
      .then((res) => {
        const arraysongs = []
        res?.docs?.forEach((doc) => {
          const data = doc?.data()
          data.id = doc?.id
          arraysongs.push(data)
        })
        setSongs(arraysongs)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Ultimos artistas"
          data={artists}
          folderImage="artists"
          urlName="artist"
        />
        <BasicSliderItems
          title="Ultimos Albums"
          data={albums}
          folderImage="albums"
          urlName="album"
        />
        <SongsSlider
          title="Ultimas Canciones"
          data={songs}
          playerSong={playerSong}
        />
      </div>
    </>
  )
}

export default Home
