import Header from "./Header";
import BrowseRecipes from "./BrowseRecipes";
import { Route, Routes } from "react-router";
import MyRecipes from "./MyRecipes";
import MealPlans from "./MealPlans";

function App() {
  return (
    <>
      <Header />
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
