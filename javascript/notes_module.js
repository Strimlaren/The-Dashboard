const notes_section = document.getElementById("notes");
const add_notes_button = document.getElementById("add-note-btn");

add_notes_button.addEventListener("click", function () {
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
  // listen for user input and resize the note
  textarea.addEventListener("input", function () {
    this.style.height = "0px";
    this.style.height = this.scrollHeight + "px";
  });
  // remove entire note on click
  remove_button.addEventListener("click", function () {
    note_div.remove();
  });
});
