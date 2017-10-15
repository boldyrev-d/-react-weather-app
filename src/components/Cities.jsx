import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NewCityForm from './NewCityForm';
import { loadWeather, deleteCity, changeCity, loadCurrent } from '../AC';

const Sidebar = styled.aside`
  padding: 20px;
  background-color: #3a7ca5;
  border-right: 2px solid #fff;
`;

const List = styled.ul`
  margin: 30px 0;
  padding: 0;
  list-style-type: none;
`;

const RefreshButton = styled.i`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 2px solid #fff;
  border-radius: 50%;
  opacity: 0;
  cursor: pointer;
`;

const RemoveButton = styled.i`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  opacity: 0;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    left: 50%;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #fff;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Item = styled.li`
  position: relative;
  padding-right: 55px;
  font-weight: ${props => (props.active === 'true' ? 'bold' : 'normal')};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    font-weight: bold;
  }

  &:hover ${RemoveButton}, &:hover ${RefreshButton} {
    opacity: 1;
  }
`;

const Cities = (props) => {
  /* eslint-disable no-shadow */
  const {
    activeCity,
    cities,
    geolocation,
    loadWeather,
    deleteCity,
    changeCity,
    loadCurrent,
  } = props;
  /* eslint-enable no-shadow */

  const cityList = Object.values(cities).map((city) => {
    const active = activeCity === city.name ? 'true' : 'false';

    return (
      <Item
        key={city.name}
        active={active}
        onClick={() => {
          changeCity(city.name);
        }}
      >
        {city.name}
        <RefreshButton
          title="Refresh weather"
          onClick={(e) => {
            e.stopPropagation();
            loadWeather(city.name);
          }}
        />
        <RemoveButton
          title="Remove city"
          onClick={(e) => {
            e.stopPropagation();
            deleteCity(city.name);
          }}
        />
      </Item>
    );
  });

  return (
    <Sidebar>
      <List>
        <Item active={geolocation ? 'true' : 'false'} onClick={() => loadCurrent()}>
          Current location
        </Item>
        {cityList}
      </List>

      <NewCityForm />
    </Sidebar>
  );
};

Cities.propTypes = {
  // from connect
  activeCity: PropTypes.string.isRequired,
  cities: PropTypes.objectOf(
    PropTypes.shape({
      humidity: PropTypes.number,
      name: PropTypes.string,
      temp: PropTypes.number,
      timestamp: PropTypes.number,
      weatherID: PropTypes.number,
      wind: PropTypes.number,
    }),
  ).isRequired,
  geolocation: PropTypes.bool.isRequired,
  loadWeather: PropTypes.func.isRequired,
  deleteCity: PropTypes.func.isRequired,
  changeCity: PropTypes.func.isRequired,
  loadCurrent: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    const { activeCity, cities, geolocation } = state;
    return {
      activeCity,
      cities,
      geolocation,
    };
  },
  { loadWeather, deleteCity, changeCity, loadCurrent },
)(Cities);
