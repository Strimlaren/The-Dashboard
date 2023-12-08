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

    const week_data = extract_week(data);
    create_weather_cards(week_data);

    console.log(week_data);
  }
  if (!weather_data.ok) console.log("API ERROR!");
}

function create_weather_cards(array) {
  array.forEach((day) => {
    const section = document.querySelector(".weather");
    const div1 = new_element("div", "", "forecast-card");
    const img = new_element("img", "", "weather-img");
    img.alt = "weather icon";
    img.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const div2 = new_element("div", "", "forecast-text-content");
    const h4 = new_element("h4", "GET WHAT DAY IT IS HERE"); // TODO
    const div3 = new_element("div", "", "data-div");
    const div4 = new_element("div", `${day.main.temp}`, "data-obj"); // TODO
    const div5 = new_element(
      "div",
      `${day.weather[0].description}`,
      "data-obj"
    ); // TODO

    div3.append(div4);
    div3.append(div5);
    div2.append(h4);
    div2.append(div3);
    div1.append(img);
    div1.append(div2);
    section.append(div1);
  });
}

// Returns a new element of specified type and any number of classes
function new_element(element_type, content, ...element_classes) {
  const new_element = document.createElement(`${element_type}`);
  if (content !== "") new_element.innerText = content;
  for (let i = 0; i < element_classes.length; i++) {
    new_element.classList.add(element_classes[i]);
  }
  return new_element;
}

function extract_week(data) {
  const today = data.list[0];
  const filtered = [];

  data.list.forEach((dataset) => {
    if (dataset.dt_txt.includes("12:00")) filtered.push(dataset);
  });
  filtered.unshift(today);
  return filtered;
}
