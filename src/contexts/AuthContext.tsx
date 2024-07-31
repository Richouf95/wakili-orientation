"use client";

import React, { createContext, useEffect, useReducer, ReactNode } from 'react';

// Define types for TypeScript (if applicable)
interface SchoolOwner {
  name: string;
  token: string;
  schoolOwnerId: string;
}

interface AuthState {
  schoolOwner: SchoolOwner | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: SchoolOwner;
}

interface AuthContextProps extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { schoolOwner: action.payload || null };
    case 'LOGOUT':
      return { schoolOwner: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { schoolOwner: null });

  useEffect(() => {
    const storedSchoolOwner = localStorage.getItem('schoolOwner');
    if (storedSchoolOwner) {
      try {
        const schoolOwner: SchoolOwner = JSON.parse(storedSchoolOwner);
        dispatch({ type: 'LOGIN', payload: schoolOwner });
      } catch (error) {
        console.error('Failed to parse schoolOwner from localStorage:', error);
        localStorage.removeItem('schoolOwner');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
