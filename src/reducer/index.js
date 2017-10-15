import {
  DELETE_CITY,
  CHANGE_CITY,
  LOAD_TO_LOCAL,
  LOAD_CURRENT,
  LOAD_WEATHER,
  START,
  SUCCESS,
} from '../constants';

const localState = localStorage.getItem('weather');
const defaultState = (localState && JSON.parse(localState)) || {
  activeCity: '',
  cities: {},
  currentLocationWeather: {},
  loading: false,
  geolocation: false,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_WEATHER + START:
      return {
        ...state,
        loading: true,
      };

    case LOAD_WEATHER + SUCCESS:
      return {
        ...state,
        activeCity: payload.name,
        loading: false,
        geolocation: false,
        cities: {
          ...state.cities,
          [payload.name]: {
            name: payload.name,
            weatherID: payload.weather[0].id,
            temp: payload.main.temp,
            humidity: payload.main.humidity,
            wind: payload.wind.speed,
            timestamp: Date.now(),
          },
        },
      };

    // eslint-disable-next-line no-case-declarations
    case DELETE_CITY:
      const cities = Object.values(state.cities).filter(city => city.name !== payload.name);

      let activeCity;
      if (state.geolocation) {
        activeCity = '';
      } else {
        activeCity = cities.length ? cities[0].name : '';
      }

      return {
        ...state,
        activeCity,
        cities,
      };

    case CHANGE_CITY:
      if (state.activeCity !== payload.name) {
        return {
          ...state,
          activeCity: payload.name,
          geolocation: false,
        };
      }

      return state;

    case LOAD_CURRENT + SUCCESS:
      return {
        ...state,
        activeCity: '',
        geolocation: true,
        currentLocationWeather: {
          name: payload.name,
          weatherID: payload.weather[0].id,
          temp: payload.main.temp,
          humidity: payload.main.humidity,
          wind: payload.wind.speed,
          timestamp: Date.now(),
        },
        loading: false,
      };

    case LOAD_TO_LOCAL:
      localStorage.setItem('weather', JSON.stringify(state));
      return state;

    default:
      return state;
  }
};
