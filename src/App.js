import ResponsiveAppBar from "./Components/navbar/ResponsiveAppBar";
import BrowseRecipes from "./Components/browse/BrowseRecipes";
import { Route, Routes } from "react-router";
import MyRecipes from "./Components/my-recipes/MyRecipes";
import MealPlans from "./Components/meal-plans/MealPlans";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<BrowseRecipes />} />
        <Route path="Browse" element={<BrowseRecipes />} />
        <Route path="My%20Recipes" element={<MyRecipes />} />
        <Route path="Meal%20Plans" element={<MealPlans />} />
      </Routes>
    </>
  );
}

export default App;
