import React, {useEffect, useState} from 'react';
import theMovieDB, {imageUrl} from './theMovieDB'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import {icons} from './common/Icons';
import { yellow } from '@material-ui/core/colors';

export interface Show{
  id:number,
  name:string,
  overview:string,
  poster_path:string,
  vote_count:number
  
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  link:{
    textDecoration:"solid",
  }
});

export const TopRatedList:React.FC = () => {

  const [shows, setShows] = useState<Show[]>([{id:0,name:'', overview:'', poster_path:'', vote_count:0}]);

  const classes = useStyles();

  useEffect(() => {
		const loadAPI  = () => [''];
		loadAPI();
    const getShows = async () => {
      const response = await theMovieDB.get(`/tv/top_rated`);
      setShows(response.data.results);
    }
    getShows();
    
	},[]);

  

      return (
        <Grid container spacing={3}>
          {shows.map( show => (
            <Grid item xs={3}>
                  <Card key={show.name} className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={show.name}
                      image={imageUrl+show.poster_path}
                      title={show.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {show.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" >
                        <Badge badgeContent={show.vote_count} max={9999} color="primary" style={{float: "right"}}>
                        <icons.rate style={{ color: yellow['A700'] }} />
                      </Badge>
                      </Typography>
                      
                      <Typography variant="body2" color="textSecondary" component="p">
                        {show.overview}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                    <icons.watched />
                    </Button>
                    <Button size="small" color="primary">
                    <icons.addWishList />
                    </Button>
                  </CardActions>
                </Card>
                </Grid>
                ))}
          </Grid>
      )
  }