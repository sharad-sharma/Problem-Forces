import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  butn: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
    alignItems: "center"
  },
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function ContestNav({ changeContest_type }) {
  const classes = useStyles();
  
  return (
    <div className={classes.butn}>
    <div className={classes.root}>
      <Button variant="contained" color="secondary" onClick={() => changeContest_type('(Div. 1)')} >Div-1</Button>
      <Button variant="contained" color="primary" onClick={() => changeContest_type('(Div. 2)')}>Div-2</Button>
      <Button variant="contained" color="primary" onClick={() => changeContest_type('(Div. 3)')} >Div-3</Button>
      <Button variant="contained" color="primary" onClick={() => changeContest_type('(Div. 4)')} >Div-4</Button>
      <Button variant="contained" color="secondary" onClick={() => changeContest_type('Codeforces Global Round')} >Global Round</Button>
      <Button variant="contained" color="primary" onClick={() => changeContest_type('Educational Codeforces Round')} >Educational Round</Button>
      {/* <Button variant="contained" color="primary" onClick={() => changeContest_type('Combined Round')} >Combined Round</Button> */}
    </div>
    </div>
  )
}

export default ContestNav
