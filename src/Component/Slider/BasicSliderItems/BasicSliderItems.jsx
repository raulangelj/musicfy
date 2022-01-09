/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import Slider from 'react-slick'
import './BasicSliderItem.scss'
import { storage } from '../../../firebase/firebaseConfig'
import alertErrors from '../../../utils/AlertErros'

// COMPONENT FOR ARTIST ITEM
const RenderItem = ({ item }) => {
  const [imageUrl, setImageUrl] = useState(null)
  RenderItem.propTypes = {
    item: propTypes.object.isRequired,
  }

  useEffect(() => {
    storage.ref(`artist/${item.banner}`)
      .getDownloadURL()
      .then((res) => {
        setImageUrl(res)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  return (
    <div className="basic-slider-items__list-item">
      <div
        className="avatar"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />
      <h3>{item.name}</h3>
    </div>
  )
}

// COMPONENT FOR SLIDER
const BasicSliderItems = ({ title, data }) => {
  BasicSliderItems.propTypes = {
    title: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
  }

  const settings = {
    dots: false,
    infinity: true,
    // autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: 'basic-slider-items__list',
  }

  return (
    <div className="basic-slider-items__list-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        {
          data.map((artist) => (
            <RenderItem key={artist.id} item={artist} />
          ))
        }
      </Slider>
    </div>
  )
}

export default BasicSliderItems
