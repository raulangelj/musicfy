/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import './Album.scss'

const Album = () => {
  const params = useParams()
  console.log('params: ', params)

  return (
    <div>
      <h2>Single page album</h2>
    </div>
  )
}

export default Album
