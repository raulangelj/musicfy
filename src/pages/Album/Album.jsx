/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import propTypes, { array } from 'prop-types'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'
import './Album.scss'
import ListSongs from '../../Component/Songs/ListSongs'

const HeaderAlbum = ({ album, albumImage, artist }) => {
  HeaderAlbum.propTypes = {
    album: propTypes.object.isRequired,
    albumImage: propTypes.string.isRequired,
    artist: propTypes.object.isRequired,
  }

  return (
    <div className="album__header">
      <div
        className="image"
        style={{
          backgroundImage: `url('${albumImage}')`,
        }}
      />
      <div className="info">
        <h1>{album.name}</h1>
        <p>
          De
          {' '}
          <Link to={`/artist/${artist.id}`}>
            <span>{artist.name}</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

const Album = ({ playerSong }) => {
  const params = useParams()
  const { id } = params
  const [album, setAlbum] = useState(null)
  const [albumImage, setAlbumImage] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState([])

  Album.propTypes = {
    playerSong: propTypes.func.isRequired,
  }

  // USEEFECT TO GET ALBUM DATA IN FIRESTORE
  useEffect(() => {
    db.collection('albums')
      .doc(id)
      .get()
      .then((res) => {
        const data = res.data()
        data.id = res.id
        setAlbum(data)
      })
      .catch((err) => {
        alertErrors(err)
      })
  }, [id])

  // USEEFECT TO GET ALBUM IMAGE IN STOREGE
  useEffect(() => {
    if (album) {
      storage.ref(`albums/${album?.banner}`)
        .getDownloadURL()
        .then((res) => {
          setAlbumImage(res)
        })
        .catch((err) => {
          alertErrors(err.code)
        })
    }
  }, [album])

  // USEEFECT TO GET ARTIST INFO IN FIRESTORE
  useEffect(() => {
    if (album) {
      db.collection('artists')
        .doc(album?.artist)
        .get()
        .then((res) => {
          const data = res.data()
          data.id = res.id
          setArtist(data)
        })
        .catch((err) => {
          alertErrors(err.code)
        })
    }
  }, [album])

  // GETTING ALBUM SONGS
  useEffect(() => {
    if (album) {
      db.collection('songs')
        .where('album', '==', album.id)
        .get()
        .then((res) => {
          const arraySongs = []
          res.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            arraySongs.push(data)
          })
          setSongs(arraySongs)
        })
    }
  }, [album])

  if (!album || !artist || !albumImage) {
    return (
      <Loader active>Cargando...</Loader>
    )
  }

  return (
    <div className="album">
      <HeaderAlbum artist={artist} album={album} albumImage={albumImage} />
      <div className="album__songs">
        {
          songs && albumImage && (
            <ListSongs
              songs={songs}
              albumImg={albumImage}
              albumName={album}
              playerSong={playerSong}
            />
          )
        }
      </div>
    </div>
  )
}

export default Album
