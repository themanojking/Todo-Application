import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // avoid request without token

      try {
        const { data } = await axios.get("http://localhost:5000/verify", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, login, handleLogout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;
