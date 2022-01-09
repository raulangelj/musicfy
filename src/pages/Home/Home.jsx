/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BannerHome from '../../Component/BannerHome'
import BasicSliderItems from '../../Component/Slider/BasicSliderItems'
import { db } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Home.scss'

const Home = () => {
  const [artists, setArtists] = useState([])

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
        <h2>Mas ...</h2>
      </div>
    </>
  )
}

export default Home
