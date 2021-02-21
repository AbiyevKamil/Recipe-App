// Variable declerations

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

let searchQuery = "";

// Getting API things

const APP_ID = "0b0614dc";
const APP_key = "78af69b2bb006d492d140d6063dd94bf";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI(e);
});

// Fetching API

async function fetchAPI(e) {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  await fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      generateHTML(data.hits);
      e.target.querySelector('input').value = ''
    });
}

// Generating HTML content

function generateHTML(results) {
  container.classList.remove("initial");

  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="item">
        <img src="${result.recipe.image}" alt="recipe">
        <div class="flex-container">
            <div class="title">${result.recipe.label}</div>
            <a href="${result.recipe.shareAs}" class="view-btn">View recipe</a>
        </div>
        <div class="item-data">Calories: ${result.recipe.calories.toFixed(2)}Kcal</div>
    </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
