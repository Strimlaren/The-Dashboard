// Add prototype functions for localstorage to easier get and set arrays into localstorage.
Storage.prototype.set_obj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.get_obj = function (key) {
  return JSON.parse(this.getItem(key));
};

if (!localStorage.getItem("bgUrl"))
  document.body.style.backgroundImage =
    "https://images.unsplash.com/photo-1630839437035-dac17da580d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MzczMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDIwNDUyNTh8&ixlib=rb-4.0.3&q=85";
else
  document.body.style.backgroundImage = `url("${localStorage.get_obj(
    "bgUrl"
  )}")`;

// Check if notes array has been created in the local storage.
let local_notes_data = [];
if (!localStorage.getItem("notesData")) {
  localStorage.set_obj("notesData", local_notes_data);
} else {
  // Load all note data to the page
  local_notes_data = localStorage.get_obj("notesData");
  local_notes_data.forEach((element) =>
    create_note(element.id, element.text, false)
  );
}

// Check if Quick-Links array has been created in the local storage.
let local_links_data = [];
if (!localStorage.getItem("linksData")) {
  localStorage.set_obj("linksData", local_links_data);
} else {
  // Load all quick-links to the page
  local_links_data = localStorage.get_obj("linksData");
  local_links_data.forEach((element) =>
    create_link(element.name, element.url, false)
  );
}

// Headline code
let local_headline_data = "";
const my_headline = document.querySelector(".headline");
// Check if localstorage has a variable for the headline
// If not, create one and give it a starting value
if (!localStorage.getItem("headlineData")) {
  localStorage.set_obj("headlineData", "John Doe Dashboard");
  my_headline.value = "John Doe Dashboard";
  // else, set the headline to whatever is in localstorage
} else {
  my_headline.value = localStorage.get_obj("headlineData");
}
// On each input, overwrite the localstorage variable
my_headline.addEventListener("input", function () {
  localStorage.set_obj("headlineData", my_headline.value);
});

// Modal popup for creating new Quick-Links

const add_link_btn = document.querySelector("#add-link-btn");
const first_input = document.querySelector("#link-name");
add_link_btn.addEventListener("click", toggle_modal);

function toggle_modal() {
  const modal = document.querySelector(".modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
    add_link_btn.src = "images/add.svg";
  } else {
    modal.style.display = "block";
    add_link_btn.src = "images/close.svg";
    first_input.focus();
  }
}

// GLOBAL FUNCTIONS

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

// Make sure the tooltips only show on first load
if (!localStorage.getItem("firstLoad"))
  localStorage.set_obj("firstLoad", "true");
// When page loads, make the first tooltop visible
window.addEventListener("load", () => {
  if (localStorage.get_obj("firstLoad") === "true") {
    document.querySelector(".one").classList.add("show");
    localStorage.set_obj("firstLoad", "false");
  }
});

// Tooltip mechanics
let guide_note = 1;
// When user clicks any of the tooltips
function next_note() {
  const guide_notes = document.querySelectorAll("#popup");
  // Start by removing show from all tooltips
  guide_notes.forEach((note) => note.classList.remove("show"));
  /* Add show if guide note corresponds to current note being 
  looped though */
  guide_notes.forEach((note2) => {
    if (Number(note2.dataset.order) === guide_note + 1) {
      note2.classList.add("show");
    }
  });
  // Increment so next time tooltip is clicked, next set will run
  guide_note++;
}

// Restart page-tour on demand
const restart_tour_btn = document.querySelector("#show-tour");
restart_tour_btn.addEventListener("click", () => {
  guide_note = 1;
  document.querySelector(".one").classList.add("show");
});

// Toggling between assignment instructions vs. my version of notes module.
const toggle_notes_button = document.querySelector("#rättnings-version-toggle");

toggle_notes_button.addEventListener("click", () => {
  const toggle_notes_module = document.querySelector(".notes");
  const toggle_notes_module2 = document.querySelector(".notes2");
  if (toggle_notes_module.style.display !== "none") {
    toggle_notes_module.style.display = "none";
    toggle_notes_module2.style.display = "flex";
  } else {
    toggle_notes_module.style.display = "flex";
    toggle_notes_module2.style.display = "none";
  }
  console.log(toggle_notes_module);
});
