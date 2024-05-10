import React, { useState, useContext, ReactNode } from "react";
import { User } from "firebase/auth";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
