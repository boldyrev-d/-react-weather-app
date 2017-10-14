const rootUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = `&appid=${process.env.REACT_APP_API_KEY}`;

export const getWeatherByCity = city =>
  fetch(`${rootUrl}?q=${city}${appId}`).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });

export const getWeatherByLoc = (lat, lon) =>
  fetch(`${rootUrl}?lat=${lat}&lon=${lon}${appId}`).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });
