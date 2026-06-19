const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  const searchText = encodeURIComponent(query);

  const url =
    `${BASE_URL}?q=${searchText}` +
    "&limit=12" +
    "&fields=key,title,author_name,first_publish_year,cover_i";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("წიგნების ჩატვირთვა ვერ მოხერხდა.");
  }

  const data = await response.json();

  return data.docs;
}