import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateEmail, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from "../firebase";
import { getUserData } from "../firebasefunctions";

// Create context
export const AuthContext = createContext();

// Create provider to wrap app with
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  
  console.log("Current User: ", user)

  useEffect(() => {
    const getAndMergeUserDbData = async (currentUser) => {
      const dbData = await getUserData(currentUser);
      const updatedUser = {
        ...currentUser,
        ...dbData
      };
      setUser(updatedUser);
    };
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getAndMergeUserDbData(currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email)
  }

  const confirmAuth = async (credentials) => {
    return reauthenticateWithCredential(auth.currentUser, credentials)
  }

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, registerUser, signIn, logout, updateUserEmail, confirmAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}