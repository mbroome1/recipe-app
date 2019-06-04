import { getRecipes } from "./recipes";
import { getFilters } from "./filters";

const recipes = getRecipes();

const renderRecipes = () => {
  const filters = getFilters();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const recipesEl = document.querySelector("#recipes");
  recipesEl.innerHTML = "";
  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach(recipe => {
      const recipeEl = generateRecipeDOM(recipe);
      recipesEl.appendChild(recipeEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No recipes to show.";
    emptyMessage.classList.add("empty-message");
    recipesEl.appendChild(emptyMessage);
  }
};

//genereate dom for each recipe
const generateRecipeDOM = recipe => {
  const containerEl = document.createElement("div");
  const messageEl = document.createElement("p");
  const recipeEl = document.createElement("a");

  recipeEl.setAttribute("href", `./edit.html#${recipe.id}`);

  if (recipe.title.length > 0) {
    recipeEl.textContent = recipe.title;
  } else {
    recipeEl.textContent = "Unnamed recipe";
  }

  const totalIngredients = recipe.ingredients.length;

  const availableIngredients = recipe.ingredients.filter(ingredient => {
    return ingredient.hasIngredient;
  });

  const totalAvailableIngredients = availableIngredients.length;
  const message =
    totalIngredients === 0
      ? "No ingredients assigned"
      : totalAvailableIngredients === totalIngredients
      ? "You have all the ingredients"
      : totalAvailableIngredients > 0
      ? `You have some of the ingredients`
      : "You have none of the ingredients";

  messageEl.textContent = message;
  containerEl.appendChild(recipeEl);
  containerEl.appendChild(messageEl);
  containerEl.classList.add("recipe-container");

  return containerEl;
};

export { renderRecipes };
