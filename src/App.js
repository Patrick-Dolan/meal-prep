import Navbar from "./Components/navbar/Navbar";
import BrowseRecipes from "./Components/browse/BrowseRecipes";
import MyRecipes from "./Components/my-recipes/MyRecipes";
import MealPlans from "./Components/meal-plans/MealPlans";
import Account from "./Components/account/Account";
import { Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/index";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<BrowseRecipes />} />
          <Route path="Browse" element={<BrowseRecipes />} />
          <Route path="My%20Recipes" element={<MyRecipes />} />
          <Route path="Meal%20Plans" element={<MealPlans />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
