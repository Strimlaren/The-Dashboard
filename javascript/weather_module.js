api_key = "022a401dd5b35aca398478bfd4aca623";

navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  fetch_weather(lat, lon);
});

async function fetch_weather(lat, lon) {
  const weather_data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=se&units=metric&appid=${api_key}`
  );

  if (weather_data.ok) {
    const data = await weather_data.json();
    // Create all cards, with the filtered array which contains one measurement object per day. API provides 5 day forecast only.
    create_weather_cards(extract_week(data));
  } else console.log("API ERROR!");
}

// Creates cards from an array of weather API objects
function create_weather_cards(array) {
  array.forEach((day) => {
    const section = document.querySelector(".weather");
    const div1 = new_element("div", "", "forecast-card");
    const img = new_element("img", "", "weather-img");
    img.alt = "weather icon";
    img.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const div2 = new_element("div", "", "forecast-text-content");
    const h4 = new_element("h4", `${get_day(day.dt_txt)}`);
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

function get_day(date) {
  const date_obj = new Date(date);
  const day = date_obj.getDay();
  return day;
}

// Returns a new element of specified type, content and any number of classes
function new_element(element_type, content, ...element_classes) {
  const new_element = document.createElement(`${element_type}`);
  // Set content to the new element
  new_element.innerText = content !== "" ? content : "";
  // Loop through unknown amount of passed classes and add them all
  for (let i = 0; i < element_classes.length; i++) {
    new_element.classList.add(element_classes[i]);
  }
  return new_element;
}

// Return array with objects with measurements from 12:00 each day
function extract_week(data) {
  // If the first measurement is 0:00, this would send 2 measurements from first day, this prevents that. Otherwise, we just take [0] as today
  const today = data.list[0].dt_txt.includes("00:00")
    ? data.list[4]
    : data.list[0];
  const filtered = [];
  // Get todays date for later comparison
  date_today = data.list[0].dt_txt.slice(0, 10);
  // Run through entire response worth of data, and extract only 12:00 to get one measurement per day
  data.list.forEach((dataset) => {
    // We only want 12:00 measurements to make sure we get one per day, and we dont want any more measurements with todays date because we already stored todays measurement in "const today".
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
