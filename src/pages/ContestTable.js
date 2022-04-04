import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import { Difficulty } from "../util/Difficulty";
import ContestElement from "../components/ContestElement";

const useStyles = makeStyles((theme) => ({
  typo: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
    fontSize: 15,
  },
  root: {
    flexGrow: 1,
    marginTop: 15,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    // borderWidth: 1, borderColor: 'gray',borderStyle: 'solid',
    minWidth: 650,
  },
  accepted: {
    backgroundColor: '#d4edc9',
  },
  Contest_colm: {
    backgroundColor: '#fafafa',
  },
  bold: {
    fontWeight: 400,
    width: 140,
  },
}));

const indexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function ContestTable({ contest_type, contest_list, contest_data, accepted_green, wrong_red }) {
  const classes = useStyles();

  const[dummy, setDummy] = useState("")
  // const preventDefault = (event) => event.preventDefault();

  useEffect(() => {
    setDummy(contest_type)
  }, [contest_type])

  let solve = contest_list.length > 0?contest_list.map((row_val) => {
    const row = row_val.id;
    // contest should match with specified type
    if(!row_val.name.includes(dummy)) return ;
    if(!contest_data[row]) return ;
    else return (
      <TableRow key={row}>
        <TableCell className={classes.Contest_colm} align="left" component="th" scope="row">
        <Typography className={classes.typo}><Link color="inherit" target="_blank" rel="noopener" href={`https://codeforces.com/contest/${row_val.id}`}>{row_val.name.slice(0, 31)}
                </Link></Typography></TableCell>
        {
          contest_data[row].map(val => {
            let problem_name = val.name;
            const diff = Difficulty(val.rating)
            if(problem_name.length > 15) problem_name = problem_name.slice(0, 12) + '...'
            let show_color = 'nothing'
            const color_checker = `${val.contestId}/${val.index}`
            if(accepted_green[color_checker]) show_color = 'green';
            else if(wrong_red[color_checker]) show_color = 'red';
            return(
              <ContestElement val={val} diff={diff} diffRating={val.rating} problem_name={problem_name} show_color={show_color} />
            )
          })
        }
      </TableRow>
    
    )
  }):<TableRow></TableRow>

  // console.log('hitted')

  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <h1>{contest_type}</h1>
          <TableContainer component={Paper} className="root">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell align="left" className={classes.problem_colm}> <Typography className={classes.bold} >Contest</Typography></TableCell>
                  {/* <TableCell align="left">H</TableCell> */}
                  {indexes.map((indexx) => (
                    <TableCell key={indexx} align="left"> <Typography className={classes.bold} >{indexx}</Typography> </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {solve}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default ContestTable;
