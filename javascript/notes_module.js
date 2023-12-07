const notes_section = document.getElementById("notes");
const add_notes_button = document.getElementById("add-note-btn");

add_notes_button.addEventListener("click", function () {
  // give the note a "unique" id
  const my_id = random_id();
  // div
  const note_div = document.createElement("div");
  note_div.classList.add("note-div");
  // textarea
  const textarea = document.createElement("textarea");
  textarea.classList.add("note");
  // remove button
  const remove_button = document.createElement("img");
  remove_button.src = "./images/close.svg";
  remove_button.alt = "remove note button";
  remove_button.classList.add("remove-note-btn");
  // append children to div
  note_div.appendChild(textarea);
  note_div.appendChild(remove_button);
  // append div to notes section
  notes_section.appendChild(note_div);
  // set focus on the textarea when the note is created
  textarea.focus();
  // listen for user input and resize the note
  textarea.addEventListener("input", function () {
    this.style.height = "0px";
    this.style.height = this.scrollHeight + "px";

    let notes_data = localStorage.getObj("notesData");
    add_or_update_note(notes_data, { id: my_id, text: textarea.value });
    localStorage.setObj("notesData", notes_data);
  });
  // remove entire note on click
  remove_button.addEventListener("click", function () {
    let notes_data = localStorage.getObj("notesData");
    const new_notes_data = notes_data.filter((obj) => obj.id !== my_id);
    localStorage.setObj("notesData", new_notes_data);
    note_div.remove();
  });
});

// Function that will check whether this note already exists. If yes, then update it with users new input, if not, create it. This is cruical to be able to delete notes in any order.
function add_or_update_note(array, note) {
  // Find the index of the object in the array
  const index = array.findIndex((obj) => obj.id === note.id);

  // If the object is not found, add it to the array
  if (index === -1) {
    array.push(note);
  } else {
    // If the object is found, overwrite it
    array[index] = note;
  }
}

// Function that returns a random number that will serve as an unique id for each note
function random_id() {
  // const randomFraction = Math.random();
  // Scale and shift the number
  const id = Math.floor(Math.random() * 100000);
  // const id = 0 + randomFraction * 100000;
  return id;
}
