const random_bg_btn = document.getElementById("randomize-backdrop");
const body = document.querySelector("body");
random_bg_btn.addEventListener("click", get_new_bg);

async function get_new_bg() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=aPdLF6wNfbJvJugS5A36u58GJrYp08rkIOAwf0fonEo&query=space"
  );
  if (response.ok) {
    const data = await response.json();

    body.style.backgroundImage = `url("${data.urls.full}")`;
    // console.log(data);
  }
}
