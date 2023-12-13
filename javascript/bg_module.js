const random_bg_btn = document.getElementById("randomize-backdrop");
const user_keyword = document.getElementById("backdrop-keywords-input");
random_bg_btn.addEventListener("click", get_new_bg);

async function get_new_bg() {
  const query = user_keyword.value !== "" ? user_keyword.value : "planet";

  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=aPdLF6wNfbJvJugS5A36u58GJrYp08rkIOAwf0fonEo&query=${query}`
  );

  if (response.ok) {
    const data = await response.json();

    document.body.style.backgroundImage = `url("${data.urls.full}")`;
    localStorage.set_obj("bgUrl", data.urls.full);
  }
}
