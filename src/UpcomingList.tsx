import React from 'react';
import theMovieDB from './theMovieDB'

export interface Movie{
  title:string,
  overview:string
  
}

export class UpcomingList extends React.Component<{},{movies:Movie[]}> {

  state = {movies: [{title:'', overview:''}]};

  
    async componentDidMount() {
      const response = await theMovieDB.get(`/movie/upcoming`);
      this.setState({
        movies:response.data.results,
      });
    }
  
    render() {
      const {movies} = this.state; 
      return (
        <div>
          {movies.map( movie => (
            <div>
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      )
    }
  }