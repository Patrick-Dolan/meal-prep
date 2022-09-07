import Navbar from "./Components/navbar/Navbar";
import BrowseRecipes from "./Components/browse/BrowseRecipes";
import { Route, Routes } from "react-router";
import MyRecipes from "./Components/my-recipes/MyRecipes";
import MealPlans from "./Components/meal-plans/MealPlans";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/index"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<BrowseRecipes />} />
        <Route path="Browse" element={<BrowseRecipes />} />
        <Route path="My%20Recipes" element={<MyRecipes />} />
        <Route path="Meal%20Plans" element={<MealPlans />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
