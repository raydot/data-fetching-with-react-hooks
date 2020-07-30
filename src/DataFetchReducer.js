/**
 * While we can use a bunch of state hooks, all of this data belongs together!
 * A good indicator that they belong together is that they are used one after the other.
 * This combines them all with a Reducer Hook instead.
 *
 * A Reducer Hook returns a state object and a function to alter the state object.
 * This "dispatch function" takes an action which has a type and an optional
 * payload.  All of this information is used in the actual function to distill
 * a new state from the previous state, given the actions optional payload
 * and type.
 */
import React, { Fragment, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

/**
 * The Reducer Hook takes the reducer function and an initial
 * state object as parameters.  Any reducer function has access
 * to the current state and incoming action via it's arguments.
 */

const dataFetchReducer = (state, action) => {
  // The implementation of the reducer function.
  // ...state keeps the state object immutable.
  // Switch returns a new state based on the precious state and the
  // optional payload.
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  /**
   * Now, when fetching data, the dispatch function can be used to send
   * information to the reducer function.  The object being sent with the
   * dispatch function has a mandatory `type` property and an optional
   * `payload` property.  The type tells the reducer function which state
   * transition needs to be applied and the payload can additionally be used
   * by the reducer to distill the new state.  Easy, as there are only three
   * state transitions.
   *
   * At the end of the custom hook, the state is returned as before.  Whatever
   * calls the useDataApi custom hook still gets access to isLoading and isError.
   */

  useEffect(() => {
    // Keep from setting state if the component has unmounted.
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
  }, [url]);
};

export default dataFetchReducer;
