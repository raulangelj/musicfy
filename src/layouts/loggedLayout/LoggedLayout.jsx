/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import './LoggedLayout.scss'

const LoggedLayout = ({ user }) => {
  LoggedLayout.propTypes = {
    user: PropTypes.object.isRequired,
  }
  return (
    <Grid className="logged-layout">
      <Grid.Row>
        <Grid.Column width={3}>
          <h2>Menu left</h2>
        </Grid.Column>
        <Grid.Column className="content" width={13}>
          <h2>Top BAr</h2>
          <h2>Content</h2>
        </Grid.Column>
      </Grid.Row>
      <GridRow>
        <GridColumn width={16}>
          <h2>Player</h2>
        </GridColumn>
      </GridRow>
    </Grid>
  )
}

export default LoggedLayout
