import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_USER_REPOS
} from '../types';

let githubClientId,
    githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
  githubClientId=process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret=process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId=process.env.GITHUB_CLIENT_ID;
  githubClientSecret=process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [ state, dispatch ] = useReducer(GithubReducer, initialState);

  // SEARCH USERS
  // Function (asynchronous) to search & get similar users (matching text) through GitHub API
  const searchUsers = async text => {
    // Setting the "loading" state to true to enable Spinner in other components
    setLoading();
    
    // Async await function using "Axios" to get data from Github API
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
    // Setting the APP level state "users" with fetched data through API & setting "loading" state to false
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // SET LOADING
  // Setting the "loading" state to true to enable Spinner in other components
  const setLoading = () => dispatch({ type: SET_LOADING });

  // CLEAR USERS
  // Function to clear APP level state "users" & loading" (initialization)
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // GET USER
  // Function (asynchronous) to get user profile details (matching username) through GitHub API
  const getUser = async (username) => {
    // Setting the "loading" state to true to enable Spinner in other components
    setLoading();
    
    // Async await function using "Axios" to get data from Github API
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
    // Setting the APP level state "user" with fetched data through API & setting "loading" state to false
    dispatch({ type: GET_USER, payload: res.data })
  };

  // GET USER REPOS
  // Function (asynchronous) to get user profile repositories (matching username) through GitHub API
  const getUserRepos = async (username) => {
    
    setLoading(true);
    
    // Async await function using "Axios" to get data from Github API
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
    // Setting the APP level state "repos" with fetched data through API & setting "loading" state to false
    dispatch({ type: GET_USER_REPOS, payload: res.data })
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;