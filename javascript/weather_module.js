api_key = "347143b19888f8ee10ee621658579e80";

navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  fetch_weather(lat, lon);
});

async function fetch_weather(lat, lon) {
  const weather_data = await fetch(
    `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=se&units=metric&appid=${api_key}`
  );
  console.log(weather_data);
  // Om det gick bra att hämta, kör resten av koden.
  if (weather_data.ok) {
    const data = await weather_data.json();
    console.log(data);
  }
  if (!weather_data.ok) console.log("API ERROR!");
}
