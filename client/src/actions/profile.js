import axios from 'axios'
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/current');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      // to do: test errors
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      // to do: test errors
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      // to do: test errors
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Update profile
export const updateProfile = (
  formData,
  history,
  userId
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Profile Updated', 'success'));
    history.push(`/profile/${userId}`);

  } catch (error) {
    // to do: test errors
    console.error(error)


    if (error.response.data) dispatch(setAlert(error.response.data, 'danger'))

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};



// Delete account & profile
export const deleteAccount = (history) => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('api/profile');
      history.push('/');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        // to do: test errors
        payload: { msg: error.response.statusText, status: error.response.status }
      });
    }
  }
};