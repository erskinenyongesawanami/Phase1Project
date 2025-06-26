document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const randomBtn = document.getElementById("random-btn");

  searchBtn.addEventListener("click", handleSearch);
  randomBtn.addEventListener("click", getRandomDrink);
});
