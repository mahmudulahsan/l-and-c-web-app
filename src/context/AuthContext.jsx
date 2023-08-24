// React context allows us to pass/share data through the component tree without having to pass props down manually at every level.
// AuthContext.js is a React context that stores the authentication data and provides it to the components that need it.

import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  // Initially set to true. When Firebase finishes authentication and updates
  //  the user, it's set to false. This will prevent the children components
  // from rendering while the action is taking place.
  const [isLoading, setIsLoading] = useState(true);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function register(name, email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return cred.user.updateProfile({
        displayName: name,
      });
    });
  }

  function logout() {
    return auth.signOut();
  }

  function getUser() {
    return auth.currentUser;
  }

  function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    getUser,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
