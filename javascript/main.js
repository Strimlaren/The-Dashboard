// Add prototype functions for localstorage to easier get and set arrays into localstorage.
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

// First run, check if notes array has been created in the local storage.
let local_notes_data = [];
if (!localStorage.getItem("notesData")) {
  localStorage.setObj("notesData", local_notes_data);
} else {
  // Load all note data to the page
  local_notes_data = localStorage.getObj("notesData");

  local_notes_data.forEach((element) =>
    create_note(element.id, element.text, false)
  );
}

// Headline code
let local_headline_data = "";
const my_headline = document.querySelector(".headline");
// Check if localstorage has a variable for the headline
// If not, create one and give it a starting value
if (!localStorage.getItem("headlineData")) {
  localStorage.setObj("headlineData", "John Doe Dashboard");
  my_headline.value = "John Doe Dashboard";
  // else, set the headline to whatever is in localstorage
} else {
  my_headline.value = localStorage.getObj("headlineData");
}
// On each input, overwrite the localstorage variable
my_headline.addEventListener("input", function () {
  localStorage.setObj("headlineData", my_headline.value);
});

// Modal popup for creating new Quick-Links

const add_link_btn = document.querySelector("#add-link-btn");
add_link_btn.addEventListener("click", toggle_modal);

function toggle_modal() {
  const modal = document.querySelector(".modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
    add_link_btn.src = "images/add.svg";
  } else {
    modal.style.display = "block";
    add_link_btn.src = "images/close.svg";
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
