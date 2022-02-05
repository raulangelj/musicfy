/* eslint-disable no-unused-vars */
import React from 'react'
import propType from 'prop-types'
import {
  Table, Icon, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell,
} from 'semantic-ui-react'
import './ListSongs.scss'

const ListSongs = ({ songs, albumImg }) => {
  ListSongs.propTypes = {
    songs: propType.array.isRequired,
    albumImg: propType.string.isRequired,
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
        <TableRow>
          <TableCell collapsing>
            <Icon name="play circle outline" />
          </TableCell>
          <TableCell>cancion 1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell collapsing>
            <Icon name="play circle outline" />
          </TableCell>
          <TableCell>cancion 2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell collapsing>
            <Icon name="play circle outline" />
          </TableCell>
          <TableCell>cancion 3</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ListSongs
