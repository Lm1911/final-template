const STORAGE_KEY = "moodshelf-saved-books";

export function getSavedBooks() {
  const savedBooks = localStorage.getItem(STORAGE_KEY);

  if (savedBooks === null) {
    return [];
  }

  return JSON.parse(savedBooks);
}

export function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function addSavedBook(book) {
  const savedBooks = getSavedBooks();

  const bookAlreadyExists = savedBooks.some(function (savedBook) {
    return savedBook.key === book.key;
  });

  if (bookAlreadyExists) {
    return false;
  }

  savedBooks.push(book);
  saveBooks(savedBooks);

  return true;
}

export function removeSavedBook(bookKey) {
  const savedBooks = getSavedBooks();

  const updatedBooks = savedBooks.filter(function (book) {
    return book.key !== bookKey;
  });

  saveBooks(updatedBooks);
}