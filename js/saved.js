import {
  getSavedBooks,
  removeSavedBook
} from "./storage.js";

const booksContainer =
  document.querySelector("#saved-books-container");

const savedInfo =
  document.querySelector("#saved-info");

function createSavedBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";

  if (book.cover_i) {
    const image = document.createElement("img");

    image.className = "book-card__image";
    image.src =
      `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    image.alt = `${book.title} წიგნის ყდა`;

    card.appendChild(image);
  } else {
    const placeholder = document.createElement("div");

    placeholder.className = "book-card__placeholder";
    placeholder.textContent = "ყდა არ არის";

    card.appendChild(placeholder);
  }

  const content = document.createElement("div");
  content.className = "book-card__content";

  const title = document.createElement("h2");
  title.className = "book-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-card__author";

  if (book.author_name) {
    author.textContent = book.author_name[0];
  } else {
    author.textContent = "უცნობი ავტორი";
  }

  const removeButton = document.createElement("button");
  removeButton.className = "button book-card__button";
  removeButton.textContent = "წაშლა";

  removeButton.addEventListener("click", function () {
    removeSavedBook(book.key);
    displaySavedBooks();
  });

  content.appendChild(title);
  content.appendChild(author);
  content.appendChild(removeButton);

  card.appendChild(content);

  return card;
}

function displaySavedBooks() {
  const savedBooks = getSavedBooks();

  booksContainer.innerHTML = "";

  if (savedBooks.length === 0) {
    savedInfo.textContent = "შენახული წიგნები არ გაქვს.";
    return;
  }

  savedInfo.textContent =
    `შენახულია ${savedBooks.length} წიგნი`;

  savedBooks.forEach(function (book) {
    const card = createSavedBookCard(book);
    booksContainer.appendChild(card);
  });
}

displaySavedBooks();