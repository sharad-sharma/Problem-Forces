import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import DifficultyCircle from "./DifficultyCircle";
import { DifficultyPercentage } from "../util/DIfficultyPercentage";

const useStyles = makeStyles((theme) => ({
  typo: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
  },
  root: {
    '& > *': {
      margin: theme.spacing(0.2),
    },
    display: 'flex',
    flexDirection: 'row',
  },
  nothing: {

  },
  accepted: {
    backgroundColor: '#d4edc9',
  },
  wrong: {
    backgroundColor: '#ffe3e3',
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

const colour_map = {
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
  }
}

function ContestElement({ val, diff, diffRating, problem_name, show_color }) {
  const classes = useStyles();

  return (
    <TableCell className={
      show_color === "green"
        ? classes.accepted
        : show_color === "red"
        ? classes.wrong
        : classes.nothing
    } align="left">
      <div className={classes.root}>
      <DifficultyCircle percentage={DifficultyPercentage(diffRating)} diffRating={diffRating} colour={colour_map[diff].color} />
      <Typography className={classes.typo}>
        
        <Link
          className={
            diff === "difficultyRed"
              ? classes.difficultyRed
              : diff === "difficultyRedBlack"
              ? classes.difficultyRedBlack
              : diff === "difficultyOrange"
              ? classes.difficultyOrange
              : diff === "difficultyVoilet"
              ? classes.difficultyVoilet
              : diff === "difficultyBlue"
              ? classes.difficultyBlue
              : diff === "difficultyCyan"
              ? classes.difficultyCyan
              : diff === "difficultyGreen"
              ? classes.difficultyGreen
              : classes.difficultyGray
          }
          target="_blank"
          rel="noopener"
          href={`https://codeforces.com/problemset/problem/${val.contestId}/${val.index}`}
        >
          {`${val.index}. ${problem_name}`}
        </Link>
      </Typography>
      </div>
    </TableCell>
  );
}

export default ContestElement;
