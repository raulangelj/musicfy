/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Grid, GridColumn } from 'semantic-ui-react'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Artists.scss'

// component for single artist
const Artist = ({ artist }) => {
  const [bannerUrl, setBannerUrl] = useState(null)

  Artist.propTypes = {
    artist: propTypes.object.isRequired,
  }

  useEffect(() => {
    storage.ref(`artists/${artist.banner}`)
      .getDownloadURL()
      .then((res) => {
        setBannerUrl(res)
      })
      .catch((err) => {
        alertErrors(err.code, ' para los artistas')
      })
  }, [artist])

  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="artists__item">
        <div
          className="avatar"
          style={{
            backgroundImage: `url('${bannerUrl}')`,
          }}
        />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  )
}

// Artist Page
const Artists = () => {
  const [artists, setArtists] = useState(null)

  useEffect(() => {
    db.collection('artists')
      .get()
      .then((res) => {
        const arrayArtists = []
        res.docs?.forEach((artist) => {
          const data = artist.data()
          data.id = artist.id
          arrayArtists.push(data)
        })
        setArtists(arrayArtists)
      })
      .catch((err) => {
        alertErrors(err.code)
      })
  }, [])

  return (
    <div className="artists">
      <h1>Artistas</h1>
      <Grid>
        {
          artists?.map((artist) => (
            <GridColumn key={artist.id} mobile={8} tablet={4} computer={3}>
              <Artist artist={artist} />
            </GridColumn>
          ))
        }
      </Grid>
    </div>
  )
}

export default Artists
