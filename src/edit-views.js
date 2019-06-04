import moment from "moment";
import { getRecipes, deleteIngredient, toggleIngredient } from "./recipes";

const recipes = getRecipes();
console.log(recipes);

const loadEditPage = recipeId => {
  const recipe = recipes.find(recipe => recipe.id === recipeId);

  if (recipe === undefined) {
    location.assign("/index.html");
  }

  const name = document.querySelector("#recipe-name");
  const instructions = document.querySelector("#instructions");
  const dateElement = document.querySelector("#last-edited");

  name.value = recipe.title;
  instructions.value = recipe.body;
  dateElement.textContent = generateLastEdited(recipe.updatedAt);

  renderIngredients(recipe.id);
};

/* Ingredients */
const renderIngredients = recipeId => {
  const ingredientsEl = document.querySelector("#ingredients");
  ingredientsEl.innerHTML = "";

  const recipe = recipes.find(recipe => recipe.id === recipeId);

  if (!recipe) {
    return;
  }

  recipe.ingredients.forEach(ingredient => {
    const ingredientEl = generateIngredientDOM(recipe, ingredient);
    ingredientsEl.appendChild(ingredientEl);
  });
};

const generateIngredientDOM = (recipe, ingredient) => {
  const containerEL = document.createElement("div");
  const ingredientEl = document.createElement("label");
  const checkboxEl = document.createElement("input");
  const buttonEl = document.createElement("button");
  const dateElement = document.querySelector("#last-edited");

  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.setAttribute("id", ingredient.id);
  checkboxEl.checked = ingredient.hasIngredient;

  checkboxEl.addEventListener("change", () => {
    toggleIngredient(recipe.id, ingredient.id);
    renderIngredients(recipe.id, ingredient.id);
    dateElement.textContent = generateLastEdited(recipe.updatedAt);
  });

  buttonEl.classList.add("button", "button--remove");
  buttonEl.textContent = "remove";
  buttonEl.addEventListener("click", () => {
    deleteIngredient(recipe.id, ingredient.id);
    renderIngredients(recipe.id);
    dateElement.textContent = generateLastEdited(recipe.updatedAt);
  });

  ingredientEl.textContent = ingredient.ingredient;
  ingredientEl.setAttribute("for", ingredient.id);
  ingredientEl.classList.add("ingredient-label");

  containerEL.appendChild(checkboxEl);
  containerEL.appendChild(ingredientEl);
  containerEL.appendChild(buttonEl);
  containerEL.classList.add("ingredient-container");
  return containerEL;
};

//Generate the last edited message
const generateLastEdited = timestamp => {
  return `Last edited ${moment(timestamp).fromNow()}`;
};

export { loadEditPage, renderIngredients, generateLastEdited };
