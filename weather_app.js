async function getWeatherData(location) {
  // fetch weather data
  const responseJSON = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=X93G6HR8DTW52466TMUQ94YQC&contentType=json`
  );
  const response = await responseJSON.json();
  document.getElementById("loading").style.display = "none";
  return response;
}

function searchWeather() {
  // get dom elements
  const searchBtn = document.getElementById("search-btn");
  const search = document.getElementById("search");
  const cityName = document.getElementById("city");
  const conditions = document.getElementById("conditions");
  const temp = document.getElementById("temperature");
  const feelsLike = document.getElementById("feels-like");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const date = document.getElementById("date-time");

  // searchBtn listener
  searchBtn.addEventListener("click", async () => {
    document.getElementById("loading").style.display = "";
    // removes last search if exists
    if (document.getElementById("container")) {
      document.getElementById("container").remove();
    }
    try {
      const data = await getWeatherData(search.value);
      console.log(data);
      // assign values
      cityName.textContent = data.resolvedAddress;
      conditions.textContent = data.currentConditions.conditions;
      date.textContent = new Date().toString().split(" ").slice(0, 5).join(" ");
      temp.innerHTML = `${data.currentConditions.temp}&deg;F`;
      feelsLike.innerHTML = `Feels Like: ${data.currentConditions.feelslike}&deg;F`;
      wind.textContent = `Wind: ${data.currentConditions.windspeed} km/h`;
      humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
      search.value = "";
    } catch {
      cityName.textContent = "Please enter a valid city name.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  searchWeather();
  // display default location
  document.getElementById("search").value = "Toronto";
  document.getElementById("search-btn").click();
  document.getElementById("search").value = "";
});
