import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const H3 = styled.h3`
  text-align: center;
`;

const Form = styled.form`
  width: 50%;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: auto;
  cursor: pointer;
`;

const AddMovie = ({ getMovieList }) => {
  const { push } = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  const changeHandler = (e) => {
    e.persist();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', {
        title: formData.title,
        director: formData.director,
        metascore: formData.metascore,
        stars: formData.stars.split(',').map((item) => item.trim())
      })
      .then((res) => {
        getMovieList();
        push('/');
      })
      .catch((err) => {
        console.err(err.message, err.response);
      });
  };

  return (
    <>
      <H3>AddMovie</H3>
      <Form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          Title:
          <Input
            type='text'
            name='title'
            onChange={changeHandler}
            value={formData.title}
          />
        </label>
        <label htmlFor='director'>
          Director:
          <Input
            type='text'
            name='director'
            onChange={changeHandler}
            value={formData.director}
          />
        </label>
        <label htmlFor='metascore'>
          Metascore:
          <Input
            type='number'
            name='metascore'
            onChange={changeHandler}
            value={formData.metascore}
          />
        </label>
        <label htmlFor='stars'>
          Stars:
          <Input
            type='text'
            name='stars'
            onChange={changeHandler}
            value={formData.stars}
          />
        </label>
        <Button>add</Button>
      </Form>
    </>
  );
};

export default AddMovie;
