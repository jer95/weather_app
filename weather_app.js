async function getWeatherData(location) {
  // fetch weather data
  const responseJSON = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=X93G6HR8DTW52466TMUQ94YQC&contentType=json`
  );
  const response = await responseJSON.json();
  return response;
}

async function sortData(location) {
  // get weather data we need
  const data = await getWeatherData(location);
  const parsedData = data.days[0];
  return parsedData;
}

function searchWeather() {
  // dom elements
  const searchBtn = document.getElementById("search-btn");
  const search = document.getElementById("search");
  const cityName = document.getElementById("city");
  // searchBtn listener
  searchBtn.addEventListener("click", async () => {
    // removes last search if exists
    if (document.getElementById("container")) {
      document.getElementById("container").remove();
    }
    try {
      const data = await sortData(search.value);
      console.log(data);
      createElements();
      // get created elements
      const temp = document.getElementById("temp");
      const feelsLike = document.getElementById("feelslike");
      const icon = document.getElementById("icon");
      const wind = document.getElementById("wind");
      const pop = document.getElementById("pop");
      const humidity = document.getElementById("humidity");
      // assign values
      cityName.textContent = search.value;
      temp.innerHTML = `${data.temp}&deg;F`;
      feelsLike.textContent = `Feels Like ${data.feelslikemax}`;
      icon.textContent = data.conditions;
      wind.textContent = `Wind: ${data.windspeed} km/h`;
      pop.textContent = `Precipitation % : ${data.precipprob}%`;
      humidity.textContent = `Humidity: ${data.humidity}`;
    } catch {
      cityName.textContent = "Please enter a valid city name.";
    }
  });
}

function createElements() {
  const section = document.getElementById("section");

  // create html elements
  const mainContainer = document.createElement("div");
  const container1 = document.createElement("div");
  const container2 = document.createElement("div");
  const temp = document.createElement("p");
  const feelsTemp = document.createElement("p");
  const icon = document.createElement("p");
  const wind = document.createElement("p");
  const pop = document.createElement("p");
  const humidity = document.createElement("p");

  //assign attributes
  mainContainer.setAttribute("id", "container");
  mainContainer.classList.add("main-container");
  container1.classList.add("container1");
  container2.classList.add("container2");
  temp.setAttribute("id", "temp");
  temp.classList.add("temp");
  feelsTemp.setAttribute("id", "feelslike");
  wind.setAttribute("id", "wind");
  icon.setAttribute("id", "icon");
  pop.setAttribute("id", "pop");
  humidity.setAttribute("id", "humidity");

  //append elements
  container1.appendChild(temp);
  container1.appendChild(icon);
  container1.appendChild(feelsTemp);
  container2.appendChild(wind);
  container2.appendChild(pop);
  container2.appendChild(humidity);
  mainContainer.appendChild(container1);
  mainContainer.appendChild(container2);
  section.appendChild(mainContainer);
}

searchWeather();
