// Load a fixed bg image if there is no previously generated image by user
if (!localStorage.getItem("bgUrl"))
  document.body.style.backgroundImage =
    "https://images.unsplash.com/photo-1630839437035-dac17da580d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MzczMTN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDIwNDUyNTh8&ixlib=rb-4.0.3&q=85";
else
  document.body.style.backgroundImage = `url("${localStorage.get_obj(
    "bgUrl"
  )}")`;

// Check if notes array has been created in the local storage.
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
if (!localStorage.getItem("linksData")) {
  localStorage.set_obj("linksData", local_links_data);
} else {
  // Load all quick-links to the page
  local_links_data = localStorage.get_obj("linksData");
  local_links_data.forEach((element) =>
    create_link(element.name, element.url, false)
  );
}

/*Check if localstorage has a variable for the headline
If not, create one and give it a starting value */
if (!localStorage.getItem("headlineData")) {
  localStorage.set_obj("headlineData", "John Doe Dashboard");
  my_headline.value = "John Doe Dashboard";
  // else, set the headline to whatever is in localstorage
} else my_headline.value = localStorage.get_obj("headlineData");
// On each input, overwrite the localstorage variable
my_headline.addEventListener("input", function () {
  localStorage.set_obj("headlineData", my_headline.value);
});

// Make sure the tooltips only show on first load
if (!localStorage.getItem("firstLoad"))
  localStorage.set_obj("firstLoad", "true");
// When page loads, make the first tooltop visible
window.addEventListener("load", () => {
  if (localStorage.get_obj("firstLoad") === "true") {
    first_tooltip.classList.add("show");
    localStorage.set_obj("firstLoad", "false");
  }
});

// When user clicks any one of the tooltips
function next_note() {
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
restart_tour_btn.addEventListener("click", () => {
  guide_note = 1;
  first_tooltip.classList.add("show");
});

// Toggling between assignment instructions vs. my version of notes module.
toggle_notes_button.addEventListener("click", () => {
  if (toggle_notes_module.style.display !== "none") {
    toggle_notes_module.style.display = "none";
    simple_notes.style.display = "flex";
  } else {
    toggle_notes_module.style.display = "flex";
    simple_notes.style.display = "none";
  }
});

// Load simple notes text
simple_notes_textarea.value = localStorage.get_obj("notesDataSimple");
