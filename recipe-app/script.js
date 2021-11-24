
const meals = document.getElementById("meals");
const favMeals = document.getElementById("fav-meals");

async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const responseData = await response.json();
    const randomMeal = responseData.meals[0];
    
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const responseData = await response.json();
    return responseData.meals[0];
}

async function getMealsBySearch(term) {
    const meals = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + term);
}

function saveMealToLocalStorage(mealId) {
    const mealIds = getMealsFromLocaStorage();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLocaStorage();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function getMealsFromLocaStorage() {
    mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}

/******************************************/

function addMeal(meal, isRandom = false) {
    mealContainer = document.createElement('div');
    mealContainer.classList.add("meal");
    mealContainer.innerHTML = `
    ${isRandom ? `<span class="random"> Random Recipe </span>` : ""}
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="meal-body">
        <h4>${meal.strMeal}</h4>
        <button class="fav-btn" onclick="addToFavorites()">
            <i class="fas fa-heart"></i>
        </button>
    </div>
    `;

    meals.appendChild(mealContainer);

    const favBtn = mealContainer.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
        if (favBtn.classList.contains("active") ){
            removeMealFromLS(meal.idMeal);
            favBtn.classList.remove("active");
        } else {
            saveMealToLocalStorage(meal.idMeal);
            favBtn.classList.add("active");
        }
    });
}

function addMealToFavorites(meal) {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <span>${meal.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    favMeals.appendChild(li);
}

async function showFavoriteMeals() {
    const favMealIds = getMealsFromLocaStorage();

    for (let i = 0; i < favMealIds.length; i++) {
        const mealId = favMealIds[i];
        const meal = await getMealById(mealId);
    
        addMealToFavorites(meal);
    }
}

getRandomMeal();
showFavoriteMeals();
