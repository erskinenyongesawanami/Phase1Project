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

function renderCocktails(cocktails) {
  const container = document.getElementById("cocktail-container");
  container.innerHTML = "";

  cocktails.forEach(drink => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${drink.strDrink}</h3>
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
      <button onclick="getRecipe('${drink.idDrink}')">View Recipe</button>
    `;

    container.appendChild(card);
  });
}

function getRandomDrink() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => renderCocktails(data.drinks));
}

function getRecipe(id) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const drink = data.drinks[0];
      const ingredients = getIngredients(drink).join('\n');
      alert(`${drink.strDrink}\n\nIngredients:\n${ingredients}\n\nInstructions:\n${drink.strInstructions}`);
    });
}

function getIngredients(drink) {
  return Object.keys(drink)
  .filter(key => key.startsWith("strIngredient") && drink[key])
  .map(key => drink[key]);
}