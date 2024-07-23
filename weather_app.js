async function getWeatherData(location) {
  const responseJSON = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=X93G6HR8DTW52466TMUQ94YQC&contentType=json`
  );
  const response = await responseJSON.json();

  return response;
}
