/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import './Artist.scss'

const Artist = () => {
  const params = useParams()
  console.log('params: ', params)

  return (
    <div>
      <h2>artist page</h2>
    </div>
  )
}

export default Artist
