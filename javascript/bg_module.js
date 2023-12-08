const random_bg_btn = document.getElementById("randomize-backdrop");
const body = document.querySelector("body");
const user_keyword = document.getElementById("backdrop-keywords-input");
random_bg_btn.addEventListener("click", get_new_bg);

body.style.backgroundImage = `url("${localStorage.getObj("bgUrl")}")`;

async function get_new_bg() {
  const query = user_keyword.value !== "" ? user_keyword.value : "space";

  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=aPdLF6wNfbJvJugS5A36u58GJrYp08rkIOAwf0fonEo&query=${query}`
  );

  if (response.ok) {
    const data = await response.json();

    body.style.backgroundImage = `url("${data.urls.full}")`;
    localStorage.setObj("bgUrl", data.urls.full);
  }
}
