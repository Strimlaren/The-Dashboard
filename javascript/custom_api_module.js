const search_author_input = document.querySelector(".search-author");
// Wait for enter key inside author search field
search_author_input.addEventListener("keydown", (event) => {
  // Make sure user actually entered a search term
  if (event.key === "Enter" && search_author_input.vaalue !== "") {
    // Remove any previous books
    let old_books = document.querySelectorAll(".book-card");
    old_books.forEach((book) => {
      book.remove();
    });
    // Get and render new books
    get_books_by(search_author_input.value);
  }
});
// Reset the text color, from green or red.
search_author_input.addEventListener("input", () => {
  search_author_input.style.color = "white";
});

async function get_books_by(author) {
  // First get the authors openlibrary-key
  const author_response = await fetch(
    `https://openlibrary.org/search/authors.json?q=${author}`
  );
  if (author_response.ok) {
    const author_data = await author_response.json();

    /* Check if there was a result hit. Color the search text red, avoid console type
    error on the next API call and avoid trying a fetch that is doomed to fail */
    if (author_data.numFound === 0) {
      search_author_input.style.color = "red";
      return;
    }
    // Then get some of his books
    const author_key = author_data.docs[0].key;

    const books_response = await fetch(
      `https://openlibrary.org/authors/${author_key}/works.json?limit=200`
    );

    if (books_response.ok) {
      const books_data = await books_response.json();
      // Filter the response
      const filtered_books = books_data.entries
        .filter((book) => book.description)
        .filter((book) => book.authors.length === 1)
        .filter((book) => book.covers);

      if (filtered_books.length === 0)
        document.querySelector(".search-author").style.color = "red";
      if (filtered_books.length > 0)
        document.querySelector(".search-author").style.color = "green";
      create_books(filtered_books);
    }
  }
}

// Place the book objects on the module
function create_books(array) {
  array.forEach((book) => {
    const section = document.querySelector(".books");
    const div1 = new_element("div", "", "book-card");
    const img = new_element("img", "", "book-img");
    img.alt = "book cover image";
    img.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`;
    const div2 = new_element("div", "", "book-text-content");
    const h4 = new_element("h4", book.title);
    const p = new_element(
      "p",
      `${get_description(book).slice(0, 160)}...`,
      "description"
    );
    const div3 = new_element("div", "", "data-div");
    const div4 = new_element("div", book.created.value.slice(0, 4), "data-obj");
    const link = new_element("a", "More info", "data-obj");
    link.href = `https://openlibrary.org${book.key}`;
    link.target = "_blank";

    div3.append(div4);
    div3.append(link);
    div2.append(h4);
    div2.append(p);
    div2.append(div3);
    div1.append(img);
    div1.append(div2);
    section.append(div1);
  });
}

/* API endpoint hierarchy is inconsistent. Some objects returned have the description
attribute as a string, while others are objects that hold the description
behind a key "value". This makes sure to return from the correct place and avoid
"is not a function" errors. Also modify the description to get more valuable
text on the confined space of the book cards. */
function get_description(book) {
  let new_string = "";
  if (typeof book.description == "string") new_string = book.description;
  else if (typeof book.description == "object")
    new_string = book.description.value;
  // Remove the excessive newlines.
  return new_string.replace("\r\n\r\n", " ");
}
