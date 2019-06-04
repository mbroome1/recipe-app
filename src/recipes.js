import uuidv4 from "uuid/v4";
import moment from "moment";

/* structure of JSON object */

/*let recipes = [
  {
    id: "1",
    title: "Eggs on toast",
    body: "2 eggs\nslice of bread...",
    ingredients: [
      {
        ingredient: "Eggs",
        gotIngredient: false
      },
      {
        ingredient: "Bread",
        gotIngredient: true
      }
    ],
    createdAt: "123456789...",
    updatedAt: "123456789..."
  }
]*/

let recipes = [];

const loadRecipes = () => {
  const recipesJSON = localStorage.getItem("recipe-list");
  try {
    return recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveRecipes = () => {
  localStorage.setItem("recipe-list", JSON.stringify(recipes));
};

const getRecipes = () => recipes;

const getRecipeById = recipeId =>
  recipes.find(recipe => recipe.id === recipeId);

const createRecipe = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  //console.log(timestamp, id);
  recipes.push({
    id,
    title: "",
    body: "",
    ingredients: [],
    createdAt: timestamp,
    updatedAt: timestamp
  });
  saveRecipes();
  return id;
};

const updateRecipe = (recipeId, updateWhat) => {
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  if (!recipe) {
    return;
  }

  if (typeof updateWhat.title === "string") {
    recipe.title = updateWhat.title;
    recipe.updatedAt = moment().valueOf();
  }
  if (typeof updateWhat.body === "string") {
    recipe.body = updateWhat.body;
    recipe.updatedAt = moment().valueOf();
  }
  saveRecipes();
  return recipe;
};

const deleteRecipe = recipeId => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1);
    saveRecipes();
  }
};

const addIngredient = (recipeId, ingredient) => {
  const recipe = recipes.find(recipe => recipe.id === recipeId);

  if (!recipe) {
    return;
  }
  const id = uuidv4();
  recipe.ingredients.push({
    id,
    ingredient: ingredient,
    hasIngredient: false
  });
  recipe.updatedAt = moment().valueOf();
  saveRecipes();
  return recipe;
};

const deleteIngredient = (recipeId, ingredientId) => {
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  if (!recipe) {
    return;
  }

  const ingredientIndex = recipe.ingredients.findIndex(
    ingredient => ingredient.id === ingredientId
  );
  if (ingredientIndex > -1) {
    recipe.ingredients.splice(ingredientIndex, 1);
    recipe.updatedAt = moment().valueOf();
    saveRecipes();
  }
};

const toggleIngredient = (recipeId, ingredientId) => {
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  if (!recipe) {
    return;
  }

  const ingredient = recipe.ingredients.find(
    ingredient => ingredient.id === ingredientId
  );

  if (ingredient) {
    ingredient.hasIngredient = !ingredient.hasIngredient;
    recipe.updatedAt = moment().valueOf();
    saveRecipes();
  }
};

recipes = loadRecipes();

const currentDate = () => moment().valueOf();

export {
  currentDate,
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addIngredient,
  deleteIngredient,
  toggleIngredient
};
