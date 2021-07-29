import { MuiThemeProvider } from '@material-ui/core';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './App.css';

import Navbar from './components/Navbar'
import Problemset from './pages/Problemset';
import Contest from './pages/Contest'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2196f3',
      main: '#1e88e5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff4081',
      dark: '#f50057',
      contrastText: '#000',
    },
  },
});

function App() {

  const [user, setUser] = useState("")
  const [problems, setProblems] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [accepted_green, setAcceptedGreen] = useState({});
  const [wrong_red, setWrongRed] = useState({});
  const [navmssg, setNavmssg] = useState('Enter Username');
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    axios
      .get('https://codeforces.com/api/problemset.problems')
      .then(res => {
        let problem_data = res.data.result.problems.sort((a, b) => {
          return a.index - b.index
        })
        problem_data.reverse()
        //console.log(problem_data)
        setProblems(problem_data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(user) {
    axios
      .get(`https://codeforces.com/api/user.status?handle=${user}&count=1000`)
      .then(res => {
        if(res.data.status === "FAILED") {
          setNavmssg('Incorrect Username')
        }
        else {
          setAttempted(res.data.result)
          setNavmssg(user)
        }
      })
      .catch(err => {
        setNavmssg('Incorrect Username')
        console.log(err)
      })
    }
  }, [user, refresh])

  useEffect(() => {
    let dict_ac = {}
    let dict_wa = {}
    attempted.forEach(probs => {
      let name = `${probs.problem.contestId}/${probs.problem.index}`;
      if(probs.verdict === "OK") {
        dict_ac[name] = name;
      } else {
        dict_wa[name] = name;
      }
    })
    setAcceptedGreen(dict_ac);
    setWrongRed(dict_wa);
  }, [attempted])

  const changeUser = (name) => {
    setUser(name)
  }

  const doRefresh = () => {
    setRefresh(refresh+1);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
        <Navbar changeUser={changeUser} navmssg={navmssg} doRefresh={doRefresh}/>
          <Switch>
            {/* <Route exact path="/" component={Contest} /> */}
            <Route exact path="/" render={(props) => <Contest user={user} accepted_green={accepted_green} wrong_red={wrong_red} problems={problems} {...props} />} />
            <Route exact path="/problems" render={(props) => <Problemset user={user} problems={problems.slice(-100)} accepted_green={accepted_green} wrong_red={wrong_red} {...props} />} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
