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
    console.log(data);

    // const temp_today = ;
    // const weather_description_today = ;
    // const weather_code_today = ;
    // const temp_tomorrow = ;
    // const weather_description_tomorrow = ;
    // const weather_code_tomorrow = ;
    // const temp_daf = ;
    // const weather_description_daf = ;
    // const weather_code_daf = ;
  }
  if (!weather_data.ok) console.log("API ERROR!");
}
