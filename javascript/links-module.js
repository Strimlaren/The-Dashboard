const url =
  "https://faviconfinder.p.rapidapi.com/faviconurl/?url=https%3A%2F%2Fwww.google.com&fallback=https%3A%2F%2Fwww.iana.org%2F_img%2Fbookmark_icon.ico";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9ad658aa13mshe17b6f13b5876adp13912fjsnd451862bdbf4",
    "X-RapidAPI-Host": "faviconfinder.p.rapidapi.com",
  },
};
console.log("Alive");
async function get_favicon(url, options) {
  const response = await fetch(url, options);
  console.log("Fetch");
  if (response.ok) {
    const result = await response.text();
    console.log(result);
  }
}

get_favicon();
