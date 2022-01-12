/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Albums.scss'

const Album = ({ album }) => {
  const [imageUrl, setImageUrl] = useState(null)

  Album.propTypes = {
    album: propTypes.object.isRequired,
  }

  useEffect(() => {
    storage.ref(`albums/${album.banner}`)
      .getDownloadURL()
      .then((res) => {
        setImageUrl(res)
      })
      .catch((err) => {
        alertErrors(err.code, ' de albumes')
      })
  }, [album])

  return (
    <Link to={`/album/${album.id}`}>
      <div className="albums__item">
        <div
          className="avatar"
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  )
}

const Albums = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    db.collection('albums')
      .get()
      .then((res) => {
        const arrayAlbums = []
        res.docs?.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          arrayAlbums.push(data)
        })
        setAlbums(arrayAlbums)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  return (
    <div className="albums">
      <h1>Albumes</h1>
      <Grid>
        {
          albums?.map((album) => (
            <GridColumn key={album.id} mobile={8} tablet={4} computer={3}>
              <Album album={album} />
            </GridColumn>
          ))
        }
      </Grid>
    </div>
  )
}

export default Albums
