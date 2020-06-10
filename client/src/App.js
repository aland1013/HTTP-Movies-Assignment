import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieForm from './Movies/MovieForm';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList movies={movieList} />
      </Route>

      <Route path='/movies/:id'>
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>

      <Route path='/update-movie/:id'>
        <MovieForm movies={movieList} getMovieList={getMovieList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
