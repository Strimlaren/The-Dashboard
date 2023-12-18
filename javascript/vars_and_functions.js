// VARIABLES

api_key = "022a401dd5b35aca398478bfd4aca623";
let local_notes_data = [];
let local_links_data = [];
let local_headline_data = "";
let guide_note = 1;
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

// DOM CONNECTIONS

// MISCELLENOUS DOM ELEMENTS
const my_headline = document.querySelector(".headline");
const guide_notes = document.querySelectorAll("#popup");
const restart_tour_btn = document.querySelector("#show-tour");
const toggle_notes_button = document.querySelector("#rättnings-version-toggle");
const toggle_notes_module = document.querySelector(".notes");
const first_tooltip = document.querySelector(".one");
// QUICK-LINKS DOM ELEMENTS
const add_link_button = document.querySelector(".add-link");
const link_list = document.querySelector(".quick-links");
const user_link_name = document.querySelector("#link-name");
const user_link_url = document.querySelector("#website-link");
const announcer = document.querySelector(".announcer");
const toggle_quicklinks_button = document.querySelector("#add-link-btn");
const toggle_quicklinks_button2 = document.querySelector("#add-link-btn2");
const quicklinks_module = document.querySelector(".quick-links");
const quicklinks_back_module = document.querySelector(".quick-links-back");
// NOTES DOM ELEMENTS
const notes_section = document.querySelector("#notes");
const add_notes_button = document.querySelector("#add-note-btn");
const simple_notes = document.querySelector(".notes2");
const simple_notes_textarea = document.querySelector(".simple-textarea");
// BACKGROUND DOM ELEMENTS
const random_bg_btn = document.querySelector("#randomize-backdrop");
const user_keyword = document.querySelector("#backdrop-keywords-input");
// WEATHER DOM ELEMENTS
const search_weather_input = document.querySelector(".search-weather");
const weather_section = document.querySelector(".weather");
// TIME DOM ELEMENTS
const time_element = document.querySelector("#time");
const date_element = document.querySelector("#date");
// CUSTOM API DOM ELEMENTS
const search_author_input = document.querySelector(".search-author");
const book_section = document.querySelector(".books");

// EVENT LISTENERS

add_link_button.addEventListener("click", () => create_link());
add_notes_button.addEventListener("click", () => create_note());
toggle_quicklinks_button.addEventListener("click", () => toggle_quicklinks());
toggle_quicklinks_button2.addEventListener("click", () => toggle_quicklinks());
random_bg_btn.addEventListener("click", () => get_new_bg());

// FUNCTIONS

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

/* Add prototype functions for localstorage to easier get and 
set arrays into localstorage. */
Storage.prototype.set_obj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.get_obj = function (key) {
  return JSON.parse(this.getItem(key));
};
