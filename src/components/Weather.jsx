import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadWeather, loadCurrent, resetError } from '../AC';
import { REFRESH_INTERVAL } from '../constants';

const Wrapper = styled.main`
  display: grid;
  background-color: ${(props) => {
    if (props.temp >= 30) {
      return '#FF8500';
    } else if (props.temp >= 20 && props.temp < 30) {
      return '#ffc600';
    } else if (props.temp >= 10 && props.temp < 20) {
      return '#94AF10';
    } else if (props.temp > 0 && props.temp < 10) {
      return '#06799F';
    }
    return '#233884';
  }};
`;

const Inner = styled.div`
  display: grid;
  align-self: center;
  // justify-self: center;
  padding: 0 10%;
  text-align: center;
`;

const CityName = styled.h1`
  margin: 0;
  font-size: 3.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const IconWrapper = styled.div`
  padding: 25px 0;
  border-bottom: 2px solid #fff;
`;

const Icon = styled.i`
  font-size: 15rem;
  line-height: 1.5;
`;

const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  justify-self: center;
  margin: 20px 0;
`;

const Temp = styled.div`
  grid-row: 1 / 3;
  font-size: 12rem;
  line-height: 0.9;
`;

const Humidity = styled.div`
  justify-self: start;
  font-size: 4rem;
`;

const Wind = styled.div`
  justify-self: start;
  font-size: 4rem;
`;

const getTimesOfDay = () => {
  const hours = new Date().getHours();
  return hours >= 22 || hours <= 6 ? 'night' : 'day';
};

const getCelsiusFromKelvin = temp => Math.round(temp - 273.15);

class Weather extends Component {
  static propTypes = {
    // from connect
    weather: PropTypes.shape({
      humidity: PropTypes.number,
      name: PropTypes.string,
      temp: PropTypes.number,
      timestamp: PropTypes.number,
      weatherID: PropTypes.number,
      wind: PropTypes.number,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    geolocation: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      isError: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    loadWeather: PropTypes.func.isRequired,
    loadCurrent: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { error: { isError } } = this.props;
    if (isError) {
      this.props.resetError();
    }

    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

  init = (propsSource) => {
    const { loading, weather } = propsSource;

    if (Date.now() - weather.timestamp > REFRESH_INTERVAL && !loading) {
      if (propsSource.geolocation) {
        this.props.loadCurrent();
      } else {
        this.props.loadWeather(weather.name);
      }
    }
  };

  render() {
    const { loading, geolocation, error } = this.props;
    const { weatherID, name, temp, humidity, wind } = this.props.weather;

    const weatherClass = `wi wi-owm-${getTimesOfDay()}-${weatherID}`;

    const weatherBody = (() => {
      if (
        Object.keys(this.props.weather).length === 0 &&
        !loading &&
        !geolocation &&
        !error.isError
      ) {
        return (
          <Inner>
            <h1>Add city or choose current location</h1>
          </Inner>
        );
      } else if (loading) {
        return (
          <Inner>
            <h1>Loading weather...</h1>
          </Inner>
        );
      } else if (error.isError) {
        return (
          <Inner>
            <h1>{error.text}</h1>
          </Inner>
        );
      }
      return (
        <Inner>
          <CityName>{name}</CityName>

          <IconWrapper>
            <Icon className={weatherClass} />
          </IconWrapper>

          <DetailWrapper>
            <Temp>
              <span>{getCelsiusFromKelvin(temp)}</span>
              <span className="wi wi-degrees" />
            </Temp>

            <Humidity>
              <i className="wi wi-raindrop" />
              {` ${humidity} %`}
            </Humidity>

            <Wind>
              <i className="wi wi-small-craft-advisory" />
              {` ${wind} km/h`}
            </Wind>
          </DetailWrapper>
        </Inner>
      );
    })();

    return <Wrapper temp={getCelsiusFromKelvin(temp)}>{weatherBody}</Wrapper>;
  }
}

export default connect(
  (state) => {
    const { activeCity, cities, currentLocationWeather, geolocation, loading, error } = state;

    return {
      weather:
        Object.values(cities).filter(city => city.name === activeCity)[0] ||
        (geolocation && currentLocationWeather) ||
        {},
      loading,
      geolocation,
      error,
    };
  },
  { loadWeather, loadCurrent, resetError },
)(Weather);
