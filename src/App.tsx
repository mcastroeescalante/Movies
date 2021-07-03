import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import { Switch,Route } from 'react-router-dom';

import {UpcomingList} from './UpcomingList';
import {TopRatedList} from './TopRatedList';
import {PopularList} from './PopularList';
import {Movie} from './Movie';

import {icons} from './common/Icons';
import IconButton from '@material-ui/core/IconButton';


const tabs = [{
  path:'/upcoming',
  label:'Upcoming'
},
{
  path:'/top_rated',
  label:'Top Rated TV Shows'
},
{
  path:'/popular',
  label:'Popular'
}
];


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  link:{
    textDecoration: "solid",
    color: "white",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>
      <Grid container spacing={3}>
        {tabs.map((tab) => (
          <Grid item xs={3}>
          <Button color="inherit">
            <NavLink to={tab.path} className={classes.link} activeStyle={{ textDecoration: "underline",
              textDecorationColor: "red",
              textDecorationStyle: "double" }}>
                          {tab.label}
            </NavLink>
        </Button>
        </Grid>
        ))}
        </Grid>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <icons.profile />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route  path="/upcoming">
          {<UpcomingList/>}
        </Route>
        <Route path="/top_rated">
          {<TopRatedList/>}
        </Route>
        <Route path="/popular">
          {<PopularList/>}
        </Route>
        <Route path="/movie/:id">
          {<Movie/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
