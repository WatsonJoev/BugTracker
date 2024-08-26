// context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface UserContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>; // Correct type for setUser
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const UseUser = (): any => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
