import React from 'react';
import theMovieDB from './theMovieDB'

export interface Show{
  name:string,
  overview:string
  
}

export class TopRatedList extends React.Component<{},{shows:Show[]}> {

  state = {shows: [{name:'', overview:''}]};

  
    async componentDidMount() {
      const response = await theMovieDB.get(`/tv/top_rated`);
      this.setState({
        shows:response.data.results,
      });
    }
  
    render() {
      const {shows} = this.state; 
      return (
        <div>
          {shows.map( show => (
            <div>
              <h1>{show.name}</h1>
              <p>{show.overview}</p>
            </div>
          ))}
        </div>
      )
    }
  }