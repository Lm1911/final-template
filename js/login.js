const profileForm = document.querySelector("#profile-form");
const genreSelect = document.querySelector("#favorite-genre");
const genreMessage = document.querySelector("#genre-message");
const formFeedback = document.querySelector("#form-feedback");

function saveProfile(profile) {
  localStorage.setItem(
    "moodshelf-profile",
    JSON.stringify(profile)
  );
}

function handleGenreChange() {
  if (genreSelect.value === "") {
    genreMessage.textContent = "";
    return;
  }

  const selectedOption =
    genreSelect.options[genreSelect.selectedIndex];

  genreMessage.textContent =
    `არჩეული ჟანრი: ${selectedOption.textContent}`;
}

function handleProfileSubmit(event) {
  event.preventDefault();

  if (!profileForm.checkValidity()) {
    formFeedback.textContent =
      "გთხოვ, სწორად შეავსე ყველა სავალდებულო ველი.";

    formFeedback.hidden = false;
    profileForm.reportValidity();
    return;
  }

  const formData = new FormData(profileForm);

  const profile = {
    name: formData.get("name"),
    email: formData.get("email"),
    goal: Number(formData.get("goal")),
    genre: formData.get("genre"),
    notifications: formData.get("notifications") === "on",
    note: formData.get("note")
  };

  saveProfile(profile);

  formFeedback.textContent =
    "პროფილი წარმატებით შეინახა.";

  formFeedback.hidden = false;
}

genreSelect.addEventListener("change", handleGenreChange);
profileForm.addEventListener("submit", handleProfileSubmit);