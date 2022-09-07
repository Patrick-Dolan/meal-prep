import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";

// Create context
export const AuthContext = createContext();

// Create provider to wrap app with
export const AuthProvider = ({children}) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
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