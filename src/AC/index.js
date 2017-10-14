import {
  DELETE_CITY,
  CHANGE_CITY,
  // LOAD_FROM_LOCAL,
  // LOAD_TO_LOCAL,
  LOAD_WEATHER,
  START,
  SUCCESS,
} from '../constants';
import { getWeatherByCity } from '../api';

// export const loadFromLocal = () => (dispatch) => {
//   const weather = JSON.parse(localStorage.weather);

//   dispatch({
//     type: LOAD_FROM_LOCAL,
//     payload: {
//       weather,
//     },
//   });
// };

// export const loadToLocal = () => ({
//   type: LOAD_TO_LOCAL,
// });

export const loadWeather = name => (dispatch) => {
  dispatch({
    type: LOAD_WEATHER + START,
  });

  // TODO: remove setTimeout in production
  setTimeout(() => {
    getWeatherByCity(name).then((response) => {
      dispatch({
        type: LOAD_WEATHER + SUCCESS,
        payload: {
          ...response,
        },
      });
    });
    // .then(setTimeout(() => dispatch(loadToLocal()), 500)); // TODO: WTF WITH THIS ASYNC? :(
  }, 500);
};

export const deleteCity = name => (dispatch) => {
  dispatch({
    type: DELETE_CITY,
    payload: {
      name,
    },
  });

  // dispatch(loadToLocal());
};

export const changeCity = name => (dispatch) => {
  dispatch({
    type: CHANGE_CITY,
    payload: {
      name,
    },
  });

  // dispatch(loadToLocal());
};
