import {
  loadEditPage,
  renderIngredients,
  generateLastEdited
} from "./edit-views";
import {
  getRecipes,
  updateRecipe,
  deleteRecipe,
  addIngredient,
  getRecipeById
} from "./recipes";

const recipeId = location.hash.substring(1);
getRecipeById(recipeId);
loadEditPage(recipeId);

const name = document.querySelector("#recipe-name");
const instructions = document.querySelector("#instructions");
const deleteButton = document.querySelector("#delete-recipe");
const ingredientsForm = document.querySelector("#ingredients-form");
const dateElement = document.querySelector("#last-edited");

name.addEventListener("input", e => {
  const recipe = updateRecipe(recipeId, { title: e.target.value });
  dateElement.textContent = generateLastEdited(recipe.updatedAt);
});

instructions.addEventListener("input", e => {
  const recipe = updateRecipe(recipeId, { body: e.target.value });
  dateElement.textContent = generateLastEdited(recipe.updatedAt);
});

deleteButton.addEventListener("click", e => {
  deleteRecipe(recipeId);
  location.assign("./index.html");
});

ingredientsForm.addEventListener("submit", e => {
  e.preventDefault();
  const ingredient = e.target.elements.newIngredient.value.trim();
  if (ingredient.length == 0) {
    return;
  }
  const recipe = addIngredient(recipeId, ingredient);
  e.target.elements.newIngredient.value = "";
  renderIngredients(recipeId);
  dateElement.textContent = generateLastEdited(recipe.updatedAt);
});
