import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  
  const initialState = { alert: null };
  
  const [ state, dispatch ] = useReducer(AlertReducer, initialState);

  // SET ALERT
  // Function to set APP level state "alert" to passed paramteres - message & type of alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {msg, type}
    })

    // Function waits for 3 seconds and then clear APP level state "alert" (back to default i.e. null)
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000)
  }

  return (<AlertContext.Provider
    value={{ 
      alert: state.alert,
      setAlert
    }}
  >
    {props.children}
  </AlertContext.Provider>)
};

export default AlertState;