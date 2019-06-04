import { createRecipe } from "./recipes";
import { renderRecipes } from "./index-views";
import { setFilters } from "./filters";

//console.log("index.js");
//console.log(lastEdited([2019, 4, 29]));

renderRecipes();

document.querySelector("#search").value = "";
document.querySelector("#search").addEventListener("input", e => {
  setFilters({
    searchText: e.target.value
  });
  renderRecipes();
});

document.querySelector("#add-recipe").addEventListener("click", () => {
  const id = createRecipe();
  location.assign(`./edit.html#${id}`);
});
