/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Artists.scss'

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
    <div>
      <h2>Artis</h2>
    </div>
  )
}

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
            <Artist key={artist.id} artist={artist} />
          ))
        }
      </Grid>
    </div>
  )
}

export default Artists
