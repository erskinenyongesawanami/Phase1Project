document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const randomBtn = document.getElementById("random-btn");

  searchBtn.addEventListener("click", handleSearch);
  randomBtn.addEventListener("click", getRandomDrink);
});

function handleSearch() {
  const ingredient = document.getElementById("ingredient-input").value.trim();
  if (!ingredient) return;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(res => res.json())
    .then(data => {
      if (data.drinks) {
        renderCocktails(data.drinks);
      } else {
        document.getElementById("cocktail-container").innerHTML = "No cocktails found.";
      }
    });
}