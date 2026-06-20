const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  const searchText = encodeURIComponent(query);

  const url =
    `${BASE_URL}?q=${searchText}` +
    "&limit=40" +
    "&fields=key,title,author_name,first_publish_year,cover_i,edition_count";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("წიგნების ჩატვირთვა ვერ მოხერხდა.");
  }

  const data = await response.json();

  const goodBooks = data.docs.filter(function (book) {
    return (
      book.cover_i &&
      book.author_name &&
      book.first_publish_year
    );
  });

  goodBooks.sort(function (firstBook, secondBook) {
    const firstCount = firstBook.edition_count || 0;
    const secondCount = secondBook.edition_count || 0;

    return secondCount - firstCount;
  });

  return goodBooks.slice(0, 12);
}