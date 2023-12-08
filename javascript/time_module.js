const time_element = document.getElementById("time");
const date_element = document.getElementById("date");
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function update_time() {
  const time = new Date();

  const hours = time.getHours();
  const minutes = time.getMinutes();

  // In case of single digit, add leading zero
  const current_time = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  time_element.innerText = current_time;
}

function update_date() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  date_element.innerText = `${day} ${months[month - 1]} ${year}`;
}

update_time();
update_date();
setInterval(update_time, 1000);
setInterval(update_date, 1000);
