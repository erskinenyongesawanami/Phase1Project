document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const randomBtn = document.getElementById("random-btn");

  searchBtn.addEventListener("click", handleSearch);
  randomBtn.addEventListener("click", getRandomDrink);
});

// Shows a loading message while data is being fetched
function showLoading() {
  const container = document.getElementById("cocktail-container");
  container.innerHTML = "<p>Loading cocktails...</p>";
}

// Fetches data from a given URL and sends the results to renderCocktails()
function fetchAndRender(url) {
  showLoading(); //shows the loading message

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.drinks) {
        renderCocktails(data.drinks);
      } else {
        document.getElementById("cocktail-container").innerHTML = "<p>No cocktails found.</p>";
      }
    });
}

//The function that handles searching for cocktails
function handleSearch() {
  const ingredient = document.getElementById("ingredient-input").value.trim();
  if (!ingredient) return;

  fetchAndRender(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

}

//Renders  a list of cocktails to the page as cards with name,image and recipe button
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

//The function that shows random cocktails
function getRandomDrink() {
  fetchAndRender(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);

}

//Gets the full recipe and ingredients for the selected cocktail.
function getRecipe(id) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const drink = data.drinks[0];
      const ingredients = getIngredients(drink).join('\n');
      alert(`${drink.strDrink}\n\nIngredients:\n${ingredients}\n\nInstructions:\n${drink.strInstructions}`);
    });
}

//Extracts all non-null ingredient values from the drink object
function getIngredients(drink) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient}`.trim());
    }
  }

  return ingredients;
}
