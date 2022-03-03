/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, HashRouter } from 'react-router-dom'
import {
  Button, Grid, GridColumn, GridRow,
} from 'semantic-ui-react'
import Routess from '../../routes/Routes'
import MenuLeft from '../../Component/MenuLeft'
import './LoggedLayout.scss'
import TopBar from '../../Component/TopBar'
import Player from '../../Component/Player'
import { db, storage } from '../../firebase/firebaseConfig'
import alertErrors from '../../utils/AlertErros'

const LoggedLayout = ({ user, setreloadApp }) => {
  const [songData, setSongData] = useState(null)

  LoggedLayout.propTypes = {
    user: PropTypes.object.isRequired,
    setreloadApp: PropTypes.func.isRequired,
  }

  const playerSong = (albumImage, songName, songFile) => {
    storage.ref(`songs/${songFile}`)
      .getDownloadURL()
      .then((res) => {
        setSongData({
          url: res,
          image: albumImage,
          name: songName,
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  return (
    // <Router>
    <HashRouter>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routess user={user} setreloadApp={setreloadApp} playerSong={playerSong} />
          </Grid.Column>
        </Grid.Row>
        <GridRow>
          <GridColumn width={16}>
            <Player songData={songData} />
          </GridColumn>
        </GridRow>
      </Grid>
    </HashRouter>
    // </Router>
  )
}

export default LoggedLayout
