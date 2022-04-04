import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Difficulty } from "../util/Difficulty";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'row',
  },
  difficultyRedBlack: {
    color: '#aa0000'
  },
  difficultyRed: {
    color: '#ff001f',
  },
  difficultyOrange: {
    color: '#fe8c00',
  },
  difficultyVoilet: {
    color: '#aa00aa',
  },
  difficultyBlue: {
    color: '#0000ff',
  },
  difficultyCyan: {
    color: '#03a8ad',
  },
  difficultyGreen: {
    color: '#008000',
  },
  difficultyGray: {
    color: '#808080',
  },
}));

export default function UserHandleElement({ username }) {
  const classes = useStyles();

  const [rating, setRating] = useState(0);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (username) {
      axios
        .get(`https://codeforces.com/api/user.info?handles=${username}`)
        .then(res => {
          const result = res.data.result[0];
          setRating(result.rating);
          setAvatar(result.avatar);
        })
        .catch(err => console.log(err))
    }
  }, [username])

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src={avatar} />
      <Button style={{ textTransform: 'lowercase', background: 'white' }} className={
        Difficulty(rating) === "difficultyRed"
        ? classes.difficultyRed
        : Difficulty(rating) === "difficultyRedBlack"
        ? classes.difficultyRedBlack
        : Difficulty(rating) === "difficultyOrange"
        ? classes.difficultyOrange
        : Difficulty(rating) === "difficultyVoilet"
        ? classes.difficultyVoilet
        : Difficulty(rating) === "difficultyBlue"
        ? classes.difficultyBlue
        : Difficulty(rating) === "difficultyCyan"
        ? classes.difficultyCyan
        : Difficulty(rating) === "difficultyGreen"
        ? classes.difficultyGreen
        : classes.difficultyGray
        } variant="contained">
        {username}
      </Button>
    </div>
  );
}
