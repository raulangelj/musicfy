/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { storage } from '../../../firebase/firebaseConfig'
import './BannerArtist.scss'
import alertErrors from '../../../utils/AlertErros'

const BannerArtist = ({ artist }) => {
  const [bannerUrl, setBannerUrl] = useState(null)

  BannerArtist.propTypes = {
    artist: propTypes.object.isRequired,
  }

  useEffect(() => {
    storage.ref(`artists/${artist?.banner}`)
      .getDownloadURL()
      .then((res) => {
        setBannerUrl(res)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [artist])

  return (
    <div
      className="banner-artist"
      style={{
        backgroundImage: `url('${bannerUrl}')`,
      }}
    >
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h4>ARTISTA</h4>
        <h1>{artist.name}</h1>
      </div>
    </div>
  )
}

export default BannerArtist
