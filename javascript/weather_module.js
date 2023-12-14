api_key = "022a401dd5b35aca398478bfd4aca623";
/* Get user current location coordinates, call the fetch function from there.
 Avoids scope shenanigans with coord variables */
navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  fetch_weather(lat, lon);
});

// Wait for enter key inside weather search field
const search_weather_input = document.querySelector(".search-weather");
search_weather_input.addEventListener("keydown", (event) => {
  // Make sure user has actually entered something, then run the API call function
  if (event.key === "Enter" && search_weather_input.value !== "") {
    // Remove any previous weather readings
    let old_weather = document.querySelectorAll(".forecast-card");
    old_weather.forEach((forecast) => forecast.remove());
    get_search_query();
  }
});

async function get_search_query() {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${search_weather_input.value}&appid=${api_key}`
  );
  if (response.ok) {
    const city_name = await response.json();
    await fetch_weather(city_name[0].lat, city_name[0].lon);
  } else {
    console.log(response);
  }
}

async function fetch_weather(lat, lon) {
  const weather_data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${api_key}`
  );

  if (weather_data.ok) {
    const data = await weather_data.json();
    /* Set the search field to users destination when page first loads.
    Then set it to whatever the query found. */
    document.querySelector(".search-weather").value = data.city.name;
    /* Create all cards, with the filtered array which contains one 
    measurement object per day. API provides 5 day forecast only. */
    create_weather_cards(extract_week(data), data.city);
  } else console.log("WEATHER API ERROR!");
}

// Creates cards from an array of weather API objects
function create_weather_cards(filtered_data, raw_data) {
  filtered_data.forEach((day) => {
    const section = document.querySelector(".weather");
    const div1 = new_element("div", "", "forecast-card");
    const img = new_element("img", "", "weather-img");
    img.alt = "weather icon";
    img.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const div2 = new_element("div", "", "forecast-text-content");
    const h4 = new_element("h4", `${raw_data.name} - ${get_day(day.dt_txt)}`);
    const div3 = new_element("div", "", "data-div");
    const div4 = new_element("div", `${day.main.temp} °C`, "data-obj");
    const div5 = new_element(
      "div",
      `${day.weather[0].description}`,
      "data-obj"
    );

    div3.append(div4);
    div3.append(div5);
    div2.append(h4);
    div2.append(div3);
    div1.append(img);
    div1.append(div2);
    section.append(div1);
  });
}

/* Returns day. Because of API restrictions, returning measurements in 3h
 increments, it is not always possible to return "Today" to the first 
 item, as during the last hours of the day, the first measurement date 
 will be for the next day. This accounts for that. */
function get_day(date) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const passed_date = new Date(date);
  const today = new Date();
  if (passed_date.getDay() === today.getDay()) return "Today";
  return weekdays[passed_date.getDay()];
}

// Return array with objects with measurements from 12:00 each day
function extract_week(data) {
  /* If the first measurement is from 0:00, 2 measurements from first day
  would be sent, this prevents that. Otherwise, we just take[0] as today */
  const today = data.list[0].dt_txt.includes("00:00:00")
    ? data.list[4]
    : data.list[0];
  const filtered = [];
  // Get todays date for later comparison
  date_today = data.list[0].dt_txt.slice(0, 10);
  /* Run through entire response worth of data, and extract only 12:00 
  to get one measurement per day */
  data.list.forEach((dataset) => {
    /* We only want 12:00 measurements to make sure we get one per day, 
    and we dont want any more measurements with todays date because we 
    already stored todays measurement in "const today". */
    if (
      dataset.dt_txt.includes("12:00") &&
      !dataset.dt_txt.includes(date_today)
    )
      filtered.push(dataset);
  });
  // Place todays measurement first in the array
  filtered.unshift(today);
  return filtered;
}
