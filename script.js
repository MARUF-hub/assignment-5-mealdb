// ================== loading function ============
const loading = (text) => {
  const loader = document.getElementById("loader");
  loader.style.display = text;
};

// ===================== no result function ============

const noResult = (text) => {
  const noResult = document.getElementById("no-result");
  noResult.style.display = text;
};

// ===================== loadApi meals ==================

const loadApi = async (text) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMeal(data.meals);
  } catch (error) {
    console.log(error);
  }
};

// ====================== loadApi meal detais ==================

const mealDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};

// ============= displayMeal =============

const displayMeal = (meals) => {
  const mainParent = document.getElementById("meals");

  if (!meals) {
    noResult("block");
  }

  meals?.forEach((meal) => {
    const { strMeal, strMealThumb, idMeal } = meal;
    const subParent = document.createElement("div");
    subParent.classList.add("meal");
    subParent.innerHTML = `
        <div class='img-area'>
          <img src='${strMealThumb}' onClick="mealDetails(${idMeal})">
        </div>
        <h3> ${strMeal} </h3>
    `;
    mainParent.appendChild(subParent);
  });

  loading("none");
};

// =================== displayMeal Details ===================

const displayMealDetails = (meal) => {
  const { strMeal, strMealThumb } = meal;
  const [one, two, three, four, five, six, seven, eight, nine, ten] = [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
    meal.strIngredient6,
    meal.strIngredient7,
    meal.strIngredient8,
    meal.strIngredient9,
    meal.strIngredient10,
  ];

  const parentDiv = document.getElementById("mealDetails");
  parentDiv.textContent = "";

  const newDiv = document.createElement("div");
  newDiv.classList.add("meal-div");

  newDiv.innerHTML = `
        <img src="${strMealThumb}" >
        <div>
         <h3> ${strMeal} </h3>
         <li>1. ${one} </li>
         <li>2. ${two} </li>
         <li>3. ${three} </li>
         <li>4. ${four} </li>
         <li>5. ${five} </li>
         <li>6. ${six} </li>
         <li>7. ${seven} </li>
         <li>8. ${eight} </li>
         <li>9. ${nine} </li>
         <li>10. ${ten} </li>
        </div>
  `;
  parentDiv.appendChild(newDiv);
};

// ================= search function ============

const search = () => {
  const mainParent = document.getElementById("meals");
  const inputText = document.getElementById("input");
  const inputValue = inputText.value;
  const mealDetail = document.getElementById("mealDetails");

  mainParent.textContent = "";
  inputText.value = "";
  mealDetail.textContent = "";

  noResult("none");
  loading("block");
  loadApi(inputValue);
};

// ==================== Btn Handler ===============

document.getElementById("searchBtn").addEventListener("click", () => {
  search();
});

// =================== Enter event handler ================

document.getElementById("input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    search();
  }
});
