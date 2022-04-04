import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Difficulty } from "../util/Difficulty";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
    height: "100%",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    // backgroundColor: '#ffe3e3',
  },
  heading: {
    padding: 20,
  },
  accepted: {
    minWidth: 275,
    marginBottom: 20,
    height: "100%",
    backgroundColor: "#d4edc9",
  },
  wrong: {
    minWidth: 275,
    marginBottom: 20,
    height: "100%",
    backgroundColor: "#ffe3e3",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  graybg: {
    backgroundColor: "#f5f5f5",
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
});

function Problemset({ user, problems, accepted_green, wrong_red }) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  let solve = problems.map((problem) => {
    let name = `${problem.contestId}/${problem.index}`;

    let show_color = "nothing";
    if (accepted_green[name]) show_color = "green";
    else if (wrong_red[name]) show_color = "red";

    const diff = Difficulty(problem.rating)

    return (
      <Grid key={name} item sm={4} xs={12}>
        <Card
          className={
            show_color === "green"
              ? classes.accepted
              : show_color === "red"
              ? classes.wrong
              : classes.root
          }
        >
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {`Index - ${problem.index}`}
            </Typography>
            <Typography className={
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
            } variant="h5" component="h2">
              {problem.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {problem.rating ? problem.rating : "NA"}
            </Typography>
            <Typography variant="body2" component="p">
              Tags: {problem.tags.map((tag) => `${tag}, `)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
              target="_blank"
            >
              Problem Link
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <div className={classes.graybg}>
      <Typography className={classes.heading} component="h2" variant="h4" color="textPrimary" gutterBottom>
        Problems
      </Typography>
      <div style={{margin: 10}} >
      <Grid container spacing={3}>
        {solve}
      </Grid>
      </div>
    </div>
  );
}

export default Problemset;
