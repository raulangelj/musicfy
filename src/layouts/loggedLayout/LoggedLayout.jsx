/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import Routess from '../../routes/Routes'
import MenuLeft from '../../Component/MenuLeft'
import './LoggedLayout.scss'
import TopBar from '../../Component/TopBar'

const LoggedLayout = ({ user, setreloadApp }) => {
  LoggedLayout.propTypes = {
    user: PropTypes.object.isRequired,
    setreloadApp: PropTypes.func.isRequired,
  }
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
            <h2>Player</h2>
          </GridColumn>
        </GridRow>
      </Grid>
    </Router>
  )
}

export default LoggedLayout
