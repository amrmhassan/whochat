import React, { useState, useEffect, useRef } from 'react';
import useStyles from './styles';
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';

const AudioControllers = ({ mediaLink }) => {
  const classes = useStyles();
  const [audio] = useState(new Audio(mediaLink));
  const [playing, setPlaying] = useState(false);
  const [seekBarData, setSeekBarData] = useState({
    max: 100,
    value: 0,
  });

  const playRecord = async () => {
    await audio.play();
    if (audio.currentTime === audio.duration) {
      audio.currentTime = 0;
    }
  };
  const pauseRecord = () => {
    audio.pause();
  };
  const handleChangeAudioCurrentTime = (e) => {
    const currentTime = e.target.value / 100;
    audio.currentTime = currentTime;
  };
  useEffect(() => {
    audio.preload = 'metadata';
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('timeupdate', () => {
      setSeekBarData({
        ...seekBarData,
        max: Math.round(audio.duration * 100),
        value: Math.round(audio.currentTime * 100),
      });
    });
    audio.addEventListener('loadedmetadata', async () => {
      audio.currentTime = 10;
      setSeekBarData({
        ...seekBarData,
        value: Math.round(audio.currentTime * 100),
      });
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <div className={classes.playStopContainer}>
          {playing ? (
            <div onClick={pauseRecord} className={classes.pause}>
              <Pause />
            </div>
          ) : (
            <div onClick={playRecord} className={classes.play}>
              <Play />
            </div>
          )}
          <input
            type='range'
            min='0'
            max={seekBarData.max}
            value={seekBarData.value}
            onInput={handleChangeAudioCurrentTime}
            onChange={handleChangeAudioCurrentTime}
            className={classes.slider}
            id='myRange'
          />
        </div>
      </div>
    </div>
  );
};

export default AudioControllers;
