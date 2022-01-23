/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import {
  Grid, GridColumn, Icon, Image, Progress, Input,
} from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import './Player.scss'

const Player = ({ songData }) => {
  const [playerSeconds, setPlayerSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)

  Player.propTypes = {
    songData: propTypes.object,
  }

  Player.defaultProps = {
    songData: null,
  }

  // const songData = {
  //   image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-rj.appspot.com/o/albums%2Fddfd99f9-ea71-4c2f-998b-dc2c38bef44e?alt=media&token=ea53423d-36a8-4c55-b28c-bfca92b34226',
  //   name: 'Efecto volcanes',
  //   url: '',
  // }

  const onStart = () => {
    setIsPlaying(true)
  }

  const onPaused = () => {
    setIsPlaying(false)
  }

  const onProgress = (data) => {
    setPlayerSeconds(data.playedSeconds)
    setTotalSeconds(data.loadedSeconds)
  }

  useEffect(() => {
    if (songData?.url) {
      onStart()
    }
  }, [songData])

  return (
    <div className="player">
      <Grid>
        <GridColumn width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
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
            onChange={(e, data) => setVolume(Number(data.value))}
          />
        </GridColumn>
      </Grid>
      <ReactPlayer
        className="react-player"
        url={songData?.url}
        playing={isPlaying}
        height="0"
        width="0"
        volume={volume}
        onProgress={(e) => onProgress(e)}
      />
    </div>
  )
}

export default Player
