async function get_books() {
  const response = await fetch(
    "https://openlibrary.org/authors/OL1394865A/works.json?limit=200"
  );

  if (response.ok) {
    const data = await response.json();

    filtered_books = data.entries
      .filter((book) => book.description)
      .filter((book) => book.authors.length === 1)
      .filter((book) => book.covers);
    console.log(filtered_books);
    create_books(filtered_books);
  }
}

// Take author name and return his/her id for further use.
async function get_author_key(author) {
  const response = await fetch(
    `https://openlibrary.org/search/authors.json?q=${author}`
  );
  if (response.ok) {
    const data = await response.json();
    return data.docs[0].key;
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
      `${book.description.slice(0, 160)}...`,
      "description"
    );
    const div3 = new_element("div", "", "data-div");
    const div4 = new_element("div", book.created.value.slice(0, 4), "data-obj");
    const link = new_element("a", "More info", "data-obj");
    link.href = `https://openlibrary.org${book.key}`;

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

get_books();

// async get_cover(id, size) {
//   const response = await fetch(`https://covers.openlibrary.org/b/id/${id}-${size}.jpg`);
//   if (response.ok) {
//     const image =
//   }
// }
