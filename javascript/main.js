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
  // LOAD ALL NOTES DATA TO THE PAGE
  local_notes_data = localStorage.getObj("notesData");

  local_notes_data.forEach((element) => create_note(element.id, element.text));
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
