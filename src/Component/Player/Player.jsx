/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import {
  Grid, GridColumn, Icon, Image, Progress, Input,
} from 'semantic-ui-react'
import './Player.scss'

const Player = () => {
  const [playerSeconds, setPlayerSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  // Player.propTypes = {
  //   songData: propTypes.object.isRequired,
  // }
  const songDatad = {
    image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-rj.appspot.com/o/albums%2Fddfd99f9-ea71-4c2f-998b-dc2c38bef44e?alt=media&token=ea53423d-36a8-4c55-b28c-bfca92b34226',
    name: 'Efecto volcanes',
  }

  const onStart = () => {
    setIsPlaying(true)
  }

  const onPaused = () => {
    setIsPlaying(false)
  }

  return (
    <div className="player">
      <Grid>
        <GridColumn width={4} className="left">
          <Image src={songDatad?.image} />
          {songDatad?.name}
        </GridColumn>
        <GridColumn width={8} className="center">
          <div className="controls">
            {isPlaying ? (
              <Icon name="pause circle outline" onClick={onPaused} />
            ) : (
              <Icon name="play circle outline" onClick={onStart} />
            )}
          </div>
          <Progress
            progress="value"
            value={playerSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </GridColumn>
        <GridColumn width={4} className="right">
          <Input
            name="volume"
            label={<Icon name="volume up" />}
            min={0}
            max={1}
            step={0.01}
            type="range"
            value={volume}
            onChange={(e, data) => setVolume(data.value)}
          />
        </GridColumn>
      </Grid>
    </div>
  )
}

export default Player
