import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import { getUserData } from "../Firestore";

// Create context
export const AuthContext = createContext();

// Create provider to wrap app with
export const AuthProvider = ({children}) => {

  const [user, setUser] = useState({});
  const [hasAddedDbData, setHasAddedDbData] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const getAndMergeUserDbData = async () => {
      const dbData = await getUserData(user);
      const updatedUser = {
        ...user,
        ...dbData
      };
      setUser(updatedUser);
    };

    if (user?.uid && !hasAddedDbData) {
      getAndMergeUserDbData();
      setHasAddedDbData(true);
    }
  }, [user, hasAddedDbData]);

  

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    setHasAddedDbData(false);
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, registerUser, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}