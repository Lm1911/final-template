import { searchBooks } from "./api.js";
import { addSavedBook } from "./storage.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const booksContainer = document.querySelector("#books-container");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const resultsInfo = document.querySelector("#results-info");

let currentBooks = [];

function showLoading() {
  loadingMessage.hidden = false;
  errorMessage.hidden = true;
  booksContainer.innerHTML = "";
}

function hideLoading() {
  loadingMessage.hidden = true;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function createBookCard(book) {
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

  const title = document.createElement("h3");
  title.className = "book-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-card__author";

  if (book.author_name) {
    author.textContent = book.author_name[0];
  } else {
    author.textContent = "უცნობი ავტორი";
  }

  const year = document.createElement("p");
  year.className = "book-card__year";

  if (book.first_publish_year) {
    year.textContent = `გამოცემის წელი: ${book.first_publish_year}`;
  } else {
    year.textContent = "გამოცემის წელი უცნობია";
  }

  const saveButton = document.createElement("button");
  saveButton.className = "button button--primary book-card__button";
  saveButton.textContent = "შენახვა";

  saveButton.addEventListener("click", function () {
    const wasSaved = addSavedBook(book);

    if (wasSaved) {
      resultsInfo.textContent = "წიგნი წარმატებით შეინახა.";
      saveButton.textContent = "შენახულია";
      saveButton.disabled = true;
    } else {
      resultsInfo.textContent = "ეს წიგნი უკვე შენახულია.";
    }
  });

  content.appendChild(title);
  content.appendChild(author);
  content.appendChild(year);
  content.appendChild(saveButton);

  card.appendChild(content);

  return card;
}

function renderBooks(books) {
  booksContainer.innerHTML = "";

  if (books.length === 0) {
    resultsInfo.textContent = "წიგნები ვერ მოიძებნა.";
    return;
  }

  books.forEach(function (book) {
    const card = createBookCard(book);
    booksContainer.appendChild(card);
  });

  resultsInfo.textContent = `ნაპოვნია ${books.length} წიგნი`;
}

async function loadBooks(query) {
  showLoading();

  try {
    currentBooks = await searchBooks(query);
    renderBooks(currentBooks);
  } catch (error) {
    showError(error.message);
    resultsInfo.textContent = "მოხდა შეცდომა.";
  } finally {
    hideLoading();
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query.length < 2) {
    showError("ჩაწერე მინიმუმ 2 სიმბოლო.");
    return;
  }

  loadBooks(query);
}

searchForm.addEventListener("submit", handleSearchSubmit);

loadBooks("popular books");
