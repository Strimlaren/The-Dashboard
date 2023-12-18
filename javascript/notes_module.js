// Create new note with no id not text parameters sent
add_notes_button.addEventListener("click", () => create_note());

/* Function that can be called with optional parameters. When called to create a note with the interface button, it should be created with a new, random id and no text. If these values are passed in, like when browser is loading the page and wants to fetch and re-populate the notes module, it should use parameters to create a note with id and corresponding text from localStorage. */
function create_note(local_id = -1, local_text = 0, focus = true) {
  // Give the note a "unique" id unless it already has one
  const note_id = local_id === -1 ? random_id() : local_id;
  const note_div = document.createElement("div");
  note_div.classList.add("note-div");

  const textarea = document.createElement("textarea");
  textarea.classList.add("note");
  textarea.placeholder = "Don't leave me empty!";
  // Give the note text from localstorage if page is loading
  textarea.value = local_text !== 0 ? local_text : "";

  const remove_button = document.createElement("img");
  remove_button.src = "./images/close.svg";
  remove_button.alt = "remove note button";
  remove_button.classList.add("remove-note-btn");

  note_div.append(textarea);
  note_div.append(remove_button);
  notes_section.append(note_div);
  // Set focus on the textarea when the note is created by user, but not when created when page is opened anew.
  if (focus) textarea.focus();
  // Resize and save note content on user input
  textarea.addEventListener("input", adjust_and_save);
  // Run function once to save empty notes in case user never does any writing after creating it
  adjust_and_save();

  function adjust_and_save() {
    // Resize the textarea depending on amount of user input
    textarea.style.height = "auto";
    textarea.rows = 1;
    textarea.style.height = textarea.scrollHeight + "px";

    // Load data, update/create it and save data
    let notes_data = localStorage.get_obj("notesData");
    add_or_update_note(notes_data, { id: note_id, text: textarea.value });
    localStorage.set_obj("notesData", notes_data);
  }

  // Remove entire note on click
  remove_button.addEventListener("click", () => {
    let notes_data = localStorage.get_obj("notesData");
    // Go though data and remove note with this correct id
    const new_notes_data = notes_data.filter((obj) => obj.id !== note_id);
    localStorage.set_obj("notesData", new_notes_data);
    // Remove the html
    note_div.remove();
  });
}

/* Function that will check whether this note already exists. If yes, then update it with users new input, if not, create it. This is cruical to be able to delete notes in any order. */
function add_or_update_note(array, note) {
  // Find the index of the note in the array
  const index = array.findIndex((obj) => obj.id === note.id);
  // If the note is not found, add it to the array, else overwrite it
  if (index === -1) {
    array.push(note);
  } else array[index] = note;
}

/* Function that returns a random number that will serve as a "unique" id for each note */
function random_id() {
  return Math.floor(Math.random() * 1000000);
}

// Save assignment evaluation version of the notes section
simple_notes_textarea.addEventListener("input", () => {
  localStorage.set_obj(
    "notesDataSimple",
    document.querySelector(".simple-textarea").value
  );
});
