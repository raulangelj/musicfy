/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import Routess from '../../routes/Routes'
import LeftMenu from '../../Component/Auth/MenuLeft'
import './LoggedLayout.scss'

const LoggedLayout = ({ user }) => {
  LoggedLayout.propTypes = {
    user: PropTypes.object.isRequired,
  }
  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <LeftMenu
              user={user}
            />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <h2>Top BAr</h2>
            <Routess />
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
