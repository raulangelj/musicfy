/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  Button, Grid, GridColumn, GridRow,
} from 'semantic-ui-react'
import Routess from '../../routes/Routes'
import MenuLeft from '../../Component/MenuLeft'
import './LoggedLayout.scss'
import TopBar from '../../Component/TopBar'
import Player from '../../Component/Player'

const LoggedLayout = ({ user, setreloadApp }) => {
  const [songData, setSongData] = useState(null)

  LoggedLayout.propTypes = {
    user: PropTypes.object.isRequired,
    setreloadApp: PropTypes.func.isRequired,
  }

  const playerSong = (albumImage, songName, songUrl) => {
    // setSongData({
    //   url: songUrl,
    //   image: albumImage,
    //   name: songName,
    // })
  }

  // const songDatamock = {
  //   image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-rj.appspot.com/o/albums%2Fddfd99f9-ea71-4c2f-998b-dc2c38bef44e?alt=media&token=ea53423d-36a8-4c55-b28c-bfca92b34226',
  //   name: 'Efecto volcanes',
  //   url: '',
  // }

  // const image1 = 'https://firebasestorage.googleapis.com/v0/b/musicfy-rj.appspot.com/o/albums%2Fddfd99f9-ea71-4c2f-998b-dc2c38bef44e?alt=media&token=ea53423d-36a8-4c55-b28c-bfca92b34226'

  // const url1 = 'https://firebasestorage.googleapis.com/v0/b/musicfy-rj.appspot.com/o/songs%2FX2Download.com%20-%20Snoop%20Dogg%20%26%20Wiz%20Khalifa%20-%20Young%2C%20Wild%20%26%20Free%20(feat.%20Bruno%20Mars)%20%5BOfficial%20Audio%20Video%20HD%5D%20(128%20kbps).mp3?alt=media&token=6e391580-93b9-476a-9bd5-72c5db011aa9'

  // const name1 = 'Young, Wild and free'

  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routess user={user} setreloadApp={setreloadApp} />
          </Grid.Column>
        </Grid.Row>
        <GridRow>
          <GridColumn width={16}>
            <Player songData={songData} />
          </GridColumn>
        </GridRow>
      </Grid>
    </Router>
  )
}

export default LoggedLayout
