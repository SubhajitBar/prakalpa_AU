import { server } from '../store';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
    async dispatch => {
      try {
        dispatch({ type: 'allCoursesRequest' });

        const { data } = await axios.get(
          `${server}/projects?keyword=${keyword}&category=${category}`
        );

        dispatch({ type: 'allCoursesSuccess', payload: data.courses });
      } catch (error) {
        dispatch({
          type: 'allCoursesFail',
          payload: error.response.data.message,
        });
      }
    };

export const getCourseLectures = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getCourseRequest' });

    const { data } = await axios.get(`${server}/project/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCourseFail',
      payload: error.response.data.message,
    });
  }
};


export const enrollment = (id) => async (dispatch) => {
  try {
      dispatch({ type: 'enrollmentRequest' });

      const { data } = await axios.get(`${server}/enrollme/${id}`, {
          withCredentials: true,
      });

      dispatch({ type: 'enrollmentSuccess', payload: data.course });
  } catch (error) {
      dispatch({
          type: 'enrollmentFail',
          payload: error.response.data.message,
      });
  }
};


export const enrollmentVerification = (id) => async (dispatch) => {
  try {
      dispatch({ type: 'enrollmentVerificationRequest' });

      const { data } = await axios.get(`${server}/enrollmentverification/${id}`, {
          withCredentials: true,
      });

      dispatch({ type: 'enrollmentVerificationSuccess', payload: data.message });
  } catch (error) {
      dispatch({
          type: 'enrollmentVerificationFail',
          payload: error.response.data.message,
      });
  }
};