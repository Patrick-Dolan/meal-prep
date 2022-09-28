import { db } from "../firebase";
import { doc, setDoc, serverTimestamp, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { v4 } from "uuid";

// ==================== Firestore Functions ====================

// ====== User Functions ======

// Add or Update takes in user from auth and userDetails object
export const updateUserDBEntry = async (user, userDetails) => {
  // Create Account doc for new user with same user id
  const docRef = doc(db, "users", user.uid );
  const payload = {
    ...userDetails,
    createdAt: user.createdAt || serverTimestamp()
  }
  await setDoc(docRef, payload, { merge: true });
}

// Get User data
export const getUserData = async (user) => {
  if (user?.uid) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No document found.");
    }
  }
}

// ====== Recipe Functions ======

// Add takes in user and recipe object to create/update entry
export const createRecipeDBEntry = async (user) => {
  // Create recipes collection and add new document to it as empty recipe with created at date
  const collectionRef = collection(db, "users", user.uid, "recipes")
  const docRef = await addDoc(collectionRef, {
    name: "New Recipe",
    key: v4(),
    isDraft: true,
    isPublic: false,
    thumbnail_url: "https://bit.ly/3dSiUZK",
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

// Update takes in user and recipe to update record in DB
export const updateRecipeDBEntry = async (user, recipe) => {
  // Create Account doc for new user with same user id
  const docRef = doc(db, "users", user.uid, "recipes", recipe.id );
  const payload = {
    ...recipe,
    createdAt: recipe.createdAt || serverTimestamp()
  }
  await setDoc(docRef, payload, { merge: true });
}

// Get User recipes
export const getUserRecipes = async (user) => {
  if (user?.uid) {
    const recipes = [];
    const collectionRef = collection(db, "users", user.uid, "recipes");
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      recipes.push(doc.data());
    });
    return recipes;
  }
}