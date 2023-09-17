import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const { data: session, status } = useSession();
  useEffect(() => {
    const user = () => {
      setCurrentUser(session.user.email);
    };

    return () => {
      user();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
