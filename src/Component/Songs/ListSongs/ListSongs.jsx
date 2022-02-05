/* eslint-disable no-unused-vars */
import React from 'react'
import propType from 'prop-types'
import './ListSongs.scss'

const ListSongs = ({ songs, albumImg }) => {
  ListSongs.propTypes = {
    songs: propType.array.isRequired,
    albumImg: propType.string.isRequired,
  }

  return (
    <div>
      <h1>List Songs...</h1>
    </div>
  )
}

export default ListSongs
