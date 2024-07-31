import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    name: string,
    email: string,
    telephone: string,
    pwd: string
  ) => {
    setIsLoading(true);
    setError(null);

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/schoolOwner/singup`,
      {
        method: "POST",
        body: JSON.stringify({ name, email, telephone, pwd, role: 'school' }),
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

      return;
    }
  };

  return { signup, isLoading, error };
};
