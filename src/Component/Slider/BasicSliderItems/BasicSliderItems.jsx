/* eslint-disable no-unused-vars */
import React from 'react'
import propTypes from 'prop-types'
import Slider from 'react-slick'
import './BasicSliderItem.scss'

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
    className: 'basic-silder-items__list',
  }

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  )
}

export default BasicSliderItems
