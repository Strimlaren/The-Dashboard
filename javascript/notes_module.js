const notes_section = document.getElementById("notes");
const add_notes_button = document.getElementById("add-note-btn");

// Create new note with no id not text parameters sent
add_notes_button.addEventListener("click", () => create_note());

/* Function that can be called with optional parameters. When called to create a note with the interface button, it should be created with a new, random id and no text. If these values are passed in, like when browser is loading the page and wants to fetch and re-populate the notes module, it should use parameters to create a note with id and corresponding text from localStorage. */
function create_note(local_id = -1, local_text = 0) {
  // give the note a "unique" id unless it already has one
  const note_id = local_id === -1 ? random_id() : local_id;
  // div
  const note_div = document.createElement("div");
  note_div.classList.add("note-div");
  // textarea
  const textarea = document.createElement("textarea");
  textarea.classList.add("note");
  // give the note text from localstorage if page is loading
  textarea.value = local_text !== 0 ? local_text : "";
  // remove button
  const remove_button = document.createElement("img");
  remove_button.src = "./images/close.svg";
  remove_button.alt = "remove note button";
  remove_button.classList.add("remove-note-btn");
  // append children to div
  note_div.append(textarea);
  note_div.append(remove_button);
  // append div to notes section
  notes_section.append(note_div);
  // set focus on the textarea when the note is created
  textarea.focus();
  // resize and save note content on user input
  textarea.addEventListener("input", function () {
    this.style.height = "0px";
    this.style.height = this.scrollHeight + "px";
    // load data, update/create it and save data
    let notes_data = localStorage.getObj("notesData");
    add_or_update_note(notes_data, { id: note_id, text: textarea.value });
    localStorage.setObj("notesData", notes_data);
  });

  // remove entire note on click
  remove_button.addEventListener("click", function () {
    let notes_data = localStorage.getObj("notesData");
    // go though data and remove note with this correct id
    const new_notes_data = notes_data.filter((obj) => obj.id !== note_id);
    localStorage.setObj("notesData", new_notes_data);
    // remove the html
    note_div.remove();
  });
}

/* Function that will check whether this note already exists. If yes, then update it with users new input, if not, create it. This is cruical to be able to delete notes in any order. */
function add_or_update_note(array, note) {
  // Find the index of the note in the array
  const index = array.findIndex((obj) => obj.id === note.id);
  // If the note is not found, add it to the array
  if (index === -1) {
    array.push(note);
  } else {
    // If the object is found, overwrite it
    array[index] = note;
  }
}

/* Function that returns a random number that will serve as a "unique" id for each note */
function random_id() {
  return Math.floor(Math.random() * 1000000);
}
