// import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      name: "vishal",
      profilePic: "https://pbs.twimg.com/profile_images/1279347647891959809/yZ9aMXnd_400x400.jpg"
    }
  );

  const login = async (inputs) => {
    setCurrentUser(inputs)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};