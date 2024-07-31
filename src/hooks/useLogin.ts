import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, pwd: string) => {
    setIsLoading(true);
    setError(null);

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/schoolOwner/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, pwd }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const resultJson = await result.json();

    if (!result.ok) {
      setIsLoading(false);
      setError(resultJson.error);
    }

    if (result.ok) {
      localStorage.setItem("schoolOwner", JSON.stringify(resultJson));

      dispatch({ type: "LOGIN", payload: resultJson });

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return { login, isLoading, error };
};
