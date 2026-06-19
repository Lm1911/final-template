const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query, searchType) {
  let searchParameter = `q=${encodeURIComponent(query)}`;

  if (searchType === "title") {
    searchParameter = `title=${encodeURIComponent(query)}`;
  }

  if (searchType === "author") {
    searchParameter = `author=${encodeURIComponent(query)}`;
  }

  const url =
    `${BASE_URL}?${searchParameter}` +
    "&limit=12" +
    "&fields=key,title,author_name,first_publish_year,cover_i";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("წიგნების ჩატვირთვა ვერ მოხერხდა.");
  }

  const data = await response.json();

  return data.docs;
}