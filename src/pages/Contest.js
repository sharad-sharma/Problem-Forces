import React, { useEffect, useState } from 'react'
import ContestNav from '../components/ContestNav'
import ContestTable from './ContestTable'
import axios from 'axios'
import { makeStyles } from '@material-ui/core';

// i want to pass contest prop to contest table along with type of contest
// to do that i can get type of contest from contest nav with a function passing as prop

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
}));

function Contest({ user, problems, accepted_green, wrong_red }) {
  const classes = useStyles();

  const [contest_type, setContest_type] = useState("(Div. 1)");
  const [contest_list, setContest_list] = useState({});
  const [contest_data, setContest_data] = useState([]);

  useEffect(() => {
    // console.log('here me')
    axios
    .get('https://codeforces.com/api/contest.list')
    .then(res => {
      setContest_list(res.data.result);
      console.log(contest_list);
    })
    .catch(err => console.log(err));

    
  }, [])

  useEffect(() => {
    // console.log('Problem_data')
    let result = {}
    problems.forEach(data => {
      if(!result[data.contestId]) result[data.contestId] = [data]
      else result[data.contestId].push(data)
    })

    setContest_data(result)
  }, [problems])

  const changeContest_type = (type) => {
    setContest_type(type);
  }

  return (
    <div className={classes.root}>
      <ContestNav changeContest_type={changeContest_type}/>
      <ContestTable contest_type={contest_type} contest_list={contest_list} accepted_green={accepted_green} wrong_red={wrong_red} contest_data={contest_data}/>
    </div>
  )
}

export default Contest
