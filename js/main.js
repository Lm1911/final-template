const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsInfo = document.querySelector("#results-info");

function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query.length < 2) {
    resultsInfo.textContent = "ჩაწერე მინიმუმ 2 სიმბოლო.";
    return;
  }

  resultsInfo.textContent = `იძებნება: ${query}`;
}

searchForm.addEventListener("submit", handleSearchSubmit);