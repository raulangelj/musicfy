/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import Slider from 'react-slick'
import './BasicSliderItem.scss'
import { Link } from 'react-router-dom'
import { storage } from '../../../firebase/firebaseConfig'
import alertErrors from '../../../utils/AlertErros'

// COMPONENT FOR ARTIST ITEM
const RenderItem = ({ item, folderImage, urlName }) => {
  const [imageUrl, setImageUrl] = useState(null)
  RenderItem.propTypes = {
    item: propTypes.object.isRequired,
    folderImage: propTypes.string.isRequired,
    urlName: propTypes.string.isRequired,
  }

  useEffect(() => {
    storage.ref(`${folderImage}/${item.banner}`)
      .getDownloadURL()
      .then((res) => {
        setImageUrl(res)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  return (
    <Link to={`/${urlName}/${item.id}`}>
      <div className="basic-slider-items__list-item">
        <div
          className="avatar"
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
        />
        <h3>{item.name}</h3>
      </div>
    </Link>
  )
}

// COMPONENT FOR SLIDER
const BasicSliderItems = ({
  title, data, folderImage, urlName,
}) => {
  BasicSliderItems.propTypes = {
    title: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
    folderImage: propTypes.string.isRequired,
    urlName: propTypes.string.isRequired,
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
            <RenderItem
              key={artist.id}
              item={artist}
              urlName={urlName}
              folderImage={folderImage}
            />
          ))
        }
      </Slider>
    </div>
  )
}

export default BasicSliderItems
