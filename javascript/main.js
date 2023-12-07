// Add prototype functions to localstorage to easier get and set arrays into localstorage.
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};
// First run, check if notes array has been created in the local storage.
const local_notes_data = [];
if (!localStorage.getItem("notesData")) {
  localStorage.setItem("notesData", JSON.stringify(local_notes_data));
} else {
  // LOAD ALL NOTES DATA TO THE PAGE
}

const test = [
  "testing text note one",
  "testing test code test of test two",
  "test of one of test of three",
];

localStorage.setObj("test_storage", test);

console.log(localStorage.getObj("test_storage"));
