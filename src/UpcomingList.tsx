import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  link:{
    textDecoration:"solid",
  }
});

export interface Movie{
  id:number,
  title:string,
  overview:string,
  poster_path:string,
  release_date:string,
  vote_count:number
  
}

export const UpcomingList:React.FC = () =>{

  const [movies, setMovies] = useState<Movie[]>([{id:0,title:'', overview:'', poster_path:'', release_date:'', vote_count:0}]);
  
  const classes = useStyles();

  
  useEffect(() => {
		const loadAPI  = () => [''];
		loadAPI();
    const getMovies = async () => {
      const response = await theMovieDB.get(`/movie/upcoming`);
      setMovies(response.data.results);
    }
    getMovies();
    
	},[]);
  
  return(
    <Grid container spacing={3}>
    {movies.map( movie => (
        <Grid item xs={3}>
          <Link to={`/movie/${movie.id}`} className={classes.link}>
            <Card key={movie.title} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={movie.title}
                  image={imageUrl+movie.poster_path}
                  title={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" >
                    {movie.release_date ? movie.release_date.split('-')[0]: ""}
                    <Badge badgeContent={movie.vote_count} max={9999} color="primary" style={{float: "right"}}>
                    <icons.rate style={{ color: yellow['A700'] }} />
                  </Badge>
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" component="p">
                    {movie.overview}
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
          </Link>
        </Grid>
    
          ))}
    </Grid>
  )
  }
