import { searchBooks } from "./api.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchType = document.querySelector("#search-type");
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
    const imagePlaceholder = document.createElement("div");
    imagePlaceholder.className = "book-card__placeholder";
    imagePlaceholder.textContent = "ყდა არ არის";

    card.appendChild(imagePlaceholder);
  }

  const content = document.createElement("div");
  content.className = "book-card__content";

  const title = document.createElement("h3");
  title.className = "book-card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-card__author";

  if (book.author_name) {
    author.textContent = book.author_name.join(", ");
  } else {
    author.textContent = "უცნობი ავტორი";
  }

  const year = document.createElement("p");
  year.className = "book-card__year";
  year.textContent = book.first_publish_year
    ? `პირველი გამოცემა: ${book.first_publish_year}`
    : "გამოცემის წელი უცნობია";

  content.appendChild(title);
  content.appendChild(author);
  content.appendChild(year);
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

async function loadBooks(query, type) {
  showLoading();

  try {
    currentBooks = await searchBooks(query, type);
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

  loadBooks(query, searchType.value);
}

function debounce(callback, delay) {
  let timerId;

  return function () {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      callback();
    }, delay);
  };
}

const delayedSearch = debounce(function () {
  const query = searchInput.value.trim();

  if (query.length >= 2) {
    loadBooks(query, searchType.value);
  }
}, 600);

function handleSearchTypeChange() {
  const query = searchInput.value.trim();

  if (query.length >= 2) {
    loadBooks(query, searchType.value);
  }
}

searchForm.addEventListener("submit", handleSearchSubmit);
searchInput.addEventListener("input", delayedSearch);
searchType.addEventListener("change", handleSearchTypeChange);

loadBooks("classic literature", "all");