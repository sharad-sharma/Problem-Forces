import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';
import { Link as Link2 } from '@material-ui/core';
import { Divider, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import clsx from 'clsx'
import SimpleSnackbar from '../util/Snackbar';
import UserHandleElement from './UserHandleElement';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 135,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign:"center",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  user: {
    marginLeft: theme.spacing(2),
  },
  username: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#2962ff',
  },
  List_width: {
    width: 200,
    color: '#1e88e5',
  },
  Progress: {
    padding: 10,
  }
}));

function Navbar({ changeUser, navmssg, doRefresh, isLoading = false }) {
  const classes = useStyles();
  const [username, setUsername] = useState('')

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.List_width}>
        <ListItem button key={'Problem Forces'} >
          <Typography variant="h6" className={classes.title}>
            Problemforces
          </Typography>
        </ListItem>
        <ListItem key={'Problem Forces version'} >
          <Typography className={classes.title} variant="caption" display="block">
            V1.2
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'Contests'} component={Link} to="/">
          <ListItemText primary={'Contests'} />
        </ListItem>
        <ListItem button key={'Problemset'} component={Link} to="/problems">
          <ListItemText primary={'Problemset'} />
        </ListItem>
        <ListItem button key={'Login'} disabled>
          <ListItemText primary={'Login'} />
        </ListItem>

      </List>
      <Divider />
      <ListItem button key={'Codeforces'} component={Link2} target="_blank" rel="noopener" href="https://codeforces.com">
        <ListItemText primary={'Codeforces'} />
      </ListItem>
      <ListItem button key={'PracticeChef'} component={Link2} target="_blank" rel="noopener" href="https://practicechef.herokuapp.com">
        <ListItemText primary={'PracticeChef'} />
      </ListItem>
      <ListItem button key={'Problemforcesv1'} component={Link2} target="_blank" rel="noopener" href="https://problemforces.firebaseapp.com/">
        <ListItemText primary={'Problemforces v1.1'} />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
          <Typography variant="h5" className={classes.title}>
            Problem Forces
          </Typography>
          <IconButton color="inherit" aria-label="menu" onClick={() => doRefresh()} >
            <RefreshIcon />
          </IconButton>

          <div>
            <IconButton color="inherit" onClick={handleClick2} aria-label="menu">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose2}
            >
              <MenuItem component={Link2} target="_blank" rel="noopener" href="https://codeforces.com" onClick={handleClose2}>Codeforces</MenuItem>
              <MenuItem component={Link2} target="_blank" rel="noopener" href="https://practicechef.herokuapp.com" onClick={handleClose2}>Practice Chef</MenuItem>
              <MenuItem onClick={handleClose2} disabled>Login</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="User Handle"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  // Do code here
                  ev.preventDefault();
                  ev.target.blur();
                  changeUser(username)
                }
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {isLoading ? <CircularProgress className={classes.Progress} disableShrink size={30} color="secondary" /> : ""}
          <Typography variant="h6" className={classes.title}>

          </Typography>
          {
            navmssg === 'Incorrect Username' | navmssg === 'Enter Username'
              ? ""
              : <UserHandleElement username={navmssg} />
          }
        </Toolbar>
      </AppBar>
      {navmssg === 'Incorrect Username' ? <SimpleSnackbar message={"Incorrect Username"} />
        : navmssg !== 'Enter Username' ? <SimpleSnackbar message={`Welcome ${navmssg}`} />
          : ""}
    </div>
  );
}

export default Navbar