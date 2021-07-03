import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import theMovieDB, {imageUrl} from './theMovieDB';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import {icons} from './common/Icons';
import { yellow } from '@material-ui/core/colors';
import { generateKeyPairSync } from "crypto";

export interface Details{
    title:string,
    overview:string,
    backdrop_path:string,
    release_date:string,
    vote_average:number,
    genres:{id:string, name:string}[]
  }

  const initialDetails:Details = {
    title:"",
    overview:"",
    backdrop_path:"",
    release_date:"",
    vote_average:0,
    genres:[]
  }

export const Movie:React.FC = () =>{
    const [details, setDetails] = useState<Details>(initialDetails); 

    const { id } = useParams<{id:string}>();

    useEffect(() => {
        const loadAPI  = () => [''];
        loadAPI();
    const getMovie = async (movieId:string) => {
      const response = await theMovieDB.get(`/movie/${movieId}`);
      setDetails(response.data);
    }
    getMovie(id);
    
    },[]);

    return (
    <>
    <img src={imageUrl+details.backdrop_path} alt="" />
    <Typography gutterBottom variant="h4" component="h2">
        {details.title}
    </Typography>
    <Typography gutterBottom variant="h6" component="h2">
        Year: {details.release_date ? details.release_date.split('-')[0]: ""}
    </Typography>
    <Typography gutterBottom variant="h6" component="h2">
        Genres: {details.genres.map((genre) => (
            <label>{genre.name} - </label>
        ))}
    </Typography>
    <Typography gutterBottom variant="h6" component="h2">
        Sinopsis: {details.overview}
    </Typography>
    <Typography gutterBottom variant="h6" component="h2">
        Rate: <Badge badgeContent={details.vote_average} max={9999} color="primary">
                <icons.rate style={{ color: yellow['A700'] }} />
            </Badge>
    </Typography>
    </>);
}