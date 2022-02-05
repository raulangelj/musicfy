/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { db, storage } from '../../../firebase/firebaseConfig'
import alertErrors from '../../../utils/AlertErros'
import './SongsSlider.scss'

const RenderSong = ({ item, playerSong }) => {
  const [banner, setBanner] = useState(null)
  const [album, setAlbum] = useState()

  RenderSong.propTypes = {
    item: propTypes.object.isRequired,
    playerSong: propTypes.func.isRequired,
  }

  const onPlay = () => {
    playerSong(banner, item.name, item.fileName)
  }

  const getImage = (itemStorage) => {
    storage.ref(`albums/${itemStorage.banner}`)
      .getDownloadURL()
      .then((res) => {
        setBanner(res)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }

  // GET DATA FORM ALBUM
  useEffect(() => {
    db.collection('albums')
      .doc(item.album)
      .get()
      .then((res) => {
        const albumTemp = res?.data()
        albumTemp.id = res?.id
        setAlbum(albumTemp)
        getImage(albumTemp)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [item])

  return (
    <div className="songs-slider__list-song">
      <div
        aria-hidden="true"
        className="avatar"
        style={{ backgroundImage: `url('${banner}')` }}
        onClick={onPlay}
      >
        <Icon name="play circle outline" />
      </div>
      <Link to={`/album/${album?.id}`}>
        <h3>{item.name}</h3>
      </Link>
    </div>
  )
}

const SongsSlider = ({ title, data, playerSong }) => {
  SongsSlider.propTypes = {
    title: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
    playerSong: propTypes.func.isRequired,
  }

  const settings = {
    dots: false,
    infinity: true,
    speed: 500,
    // autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: 'songs-slider__list',
  }

  if (data.length < 5) {
    return null
  }

  return (
    <div className="songs-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {
          data?.map((song) => (
            <RenderSong
              key={song?.id}
              item={song}
              playerSong={playerSong}
            />
          ))
        }
      </Slider>
    </div>
  )
}

export default SongsSlider
