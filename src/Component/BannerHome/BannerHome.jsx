/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './BannerHome.scss'

const BannerHome = () => {
  const [bannerUrl, setBannerUrl] = useState(null)

  useEffect(() => {
    storage.ref('others/banner-home.jpg')
      .getDownloadURL()
      .then((res) => {
        setBannerUrl(res)
      })
      .catch((err) => {
        alertErrors(err?.code, ' para home banner')
      })
  }, [])

  if (!bannerUrl) {
    return null
  }

  return (
    <div
      className="banner-home"
      style={{
        backgroundImage: `url('${bannerUrl}')`,
      }}
    />
  )
}

export default BannerHome
