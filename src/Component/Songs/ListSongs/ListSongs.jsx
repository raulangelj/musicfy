/* eslint-disable no-unused-vars */
import React from 'react'
import propType from 'prop-types'
import {
  Table, Icon, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell,
} from 'semantic-ui-react'
import './ListSongs.scss'

const Song = ({ song, albumImg, playerSong }) => {
  Song.propTypes = {
    song: propType.object.isRequired,
    albumImg: propType.string.isRequired,
    playerSong: propType.func.isRequired,
  }

  const onPlay = () => {
    playerSong(albumImg, song.name, song.fileName)
  }

  return (
    <TableRow onClick={onPlay}>
      <TableCell collapsing>
        <Icon name="play circle outline" />
      </TableCell>
      <TableCell>{song.name}</TableCell>
    </TableRow>
  )
}

// AGREGAR A LA LISTA QUE SALGA LA IMAGEN DEL ALGUM Y EL NOMBRE DEL ALBUM COMO SPOTIFY
const ListSongs = ({ songs, albumImg, playerSong }) => {
  ListSongs.propTypes = {
    songs: propType.array.isRequired,
    albumImg: propType.string.isRequired,
    playerSong: propType.func.isRequired,
  }

  return (
    <Table inverted className="list-songs">
      <TableHeader>
        <TableRow>
          <TableHeaderCell />
          <TableHeaderCell>Titulo</TableHeaderCell>
          {/* <TableHeaderCell>Album</TableHeaderCell> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          songs?.map((song) => (
            <Song
              key={song.id}
              song={song}
              playerSong={playerSong}
              albumImg={albumImg}
            />
          ))
        }
      </TableBody>
    </Table>
  )
}

export default ListSongs
